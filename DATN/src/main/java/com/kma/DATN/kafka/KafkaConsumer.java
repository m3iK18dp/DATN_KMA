package com.kma.DATN.kafka;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kma.DATN.configures.GlobalConfig;
import com.kma.DATN.fabric.DTO.TransactionFabric;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.mail.DTO.RequestSendTransactionNotVerify;
import com.kma.DATN.mail.DTO.RequestSendTransactionVerify;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.TransactionType;
import com.kma.DATN.models.TriggerLog;
import com.kma.DATN.models.TriggerType;
import com.kma.DATN.models.User;
import com.kma.DATN.repositories.TransactionRepository;
import com.kma.DATN.repositories.TriggerRepository;
import com.kma.DATN.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
    @Autowired
    private final TriggerRepository triggerRepository;
    @Autowired
    private final TransactionRepository transactionRepository;
    @Autowired
    private final IHyperledgerFabricService hyperledgerFabricService;
    @Autowired
    private final IMailService mailService;
    @Autowired
    private final UserRepository userRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumer.class);
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @KafkaListener(topics = "java", groupId = "myGroup")
    public void consumer(String message) {
        LOGGER.info(String.format("TriggerLog received -> %s", message));
        List<TriggerLog> triggerLogs = new ArrayList<>();
        try {
            triggerLogs = objectMapper.readValue(message, new TypeReference<>() {
            });
            if (!triggerLogs.isEmpty()) {
                String token = hyperledgerFabricService.loginUser(((User) GlobalConfig.getConfig("user-init-first")).getId(), "Org1");
                List<String> listId = new ArrayList<>();
                triggerLogs.forEach(triggerLog -> {
                    if (triggerLog.getType() == TriggerType.UPDATE && listId.stream().noneMatch(id -> Objects.equals(id, triggerLog.getChangedTransaction().getTransactionCode())))
                        listId.add(triggerLog.getChangedTransaction().getTransactionCode());
                    if (listId.stream().noneMatch(id -> Objects.equals(id, triggerLog.getTransaction().getTransactionCode())))
                        listId.add(triggerLog.getTransaction().getTransactionCode());
                });
                List<TransactionFabric> transactionFabrics = hyperledgerFabricService.getTransactionByIds(listId, token);
                triggerLogs.forEach(trigger -> {
                            try {
                                boolean checkVerify = transactionFabrics.stream()
                                        .anyMatch(
                                                transactionFabric ->
                                                        trigger.getType() == TriggerType.UPDATE ?
                                                                transactionFabric.getId().equals(trigger.getChangedTransaction().getTransactionCode()) &&
                                                                        hyperledgerFabricService.checkTransactionWithTransactionHash(trigger.getChangedTransaction(), transactionFabric.getDataHash()) :
                                                                transactionFabric.getId().equals(trigger.getTransaction().getTransactionCode()) &&
                                                                        hyperledgerFabricService.checkTransactionWithTransactionHash(trigger.getTransaction(), transactionFabric.getDataHash())
                                        );
                                User userCurrent = userRepository.getUserByAccountNumber(trigger.getTransaction().getSenderAccountNumber());
                                RequestSendTransactionNotVerify requestSendTransactionNotVerify = new RequestSendTransactionNotVerify();
                                requestSendTransactionNotVerify.setEmail(userCurrent.getEmail());
                                requestSendTransactionNotVerify.setTime(trigger.getCreatedAt());
                                requestSendTransactionNotVerify.setTransaction(trigger.getTransaction());
                                requestSendTransactionNotVerify.setChangedTransaction(trigger.getTransaction());
                                requestSendTransactionNotVerify.setType(trigger.getType());
                                if (trigger.getType() == TriggerType.INSERT) {
                                    if (checkVerify) {
                                        Optional<TriggerLog> checkSendMail = triggerRepository.checkSendMail(trigger.getTransaction().getTransactionCode());
                                        if (
                                                (checkSendMail.isPresent() && !Objects.equals(checkSendMail.get().getId(), trigger.getId())) ||
                                                        mailService.sendMailTransactionVerify(new RequestSendTransactionVerify(userCurrent.getEmail(), trigger.getTransaction(), trigger.getCreatedAt()))
                                        ) {
                                            if (trigger.getTransaction().getTransactionType() == TransactionType.TRANSFER &&
                                                    (checkSendMail.isEmpty() || Objects.equals(checkSendMail.get().getId(), trigger.getId()))) {
                                                mailService.sendMailTransactionVerifyToAdmin(new RequestSendTransactionVerify(((User) GlobalConfig.getConfig("user-init-first")).getEmail(), trigger.getTransaction(), trigger.getCreatedAt()));
                                                mailService.sendMailTransactionVerifyToRecipient(
                                                        new RequestSendTransactionVerify(userRepository.getUserByAccountNumber(trigger.getTransaction().getRecipientAccountNumber()).getEmail(),
                                                                trigger.getTransaction(), trigger.getCreatedAt())
                                                );
                                            }

//                            transactionExtraRepository.save(
//                                    TransactionExtra.builder()
//                                            .transactionCode(trigger.getTransaction().getTransactionCode())
//                                            .verify(true)
//                                            .sendMail(true)
//                                            .build()
//                            );
                                            trigger.setChecked(true);
                                            triggerRepository.save(trigger);
                                        }
                                    } else {
                                        if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
                                            mailService.sendMailTransactionNotVerifyToAdmin(requestSendTransactionNotVerify);
                                            transactionRepository.deleteById(trigger.getTransaction().getTransactionCode());
                                            trigger.setChecked(true);
                                            triggerRepository.save(trigger);
                                        }
                                    }
                                } else if (trigger.getType() == TriggerType.UPDATE) {
                                    if (!checkVerify) {
                                        requestSendTransactionNotVerify.setChangedTransaction(trigger.getChangedTransaction());
                                        if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
                                            mailService.sendMailTransactionNotVerifyToAdmin(requestSendTransactionNotVerify);
                                            if (!trigger.getChangedTransaction().getTransactionCode().equals(trigger.getTransaction().getTransactionCode())) {
                                                transactionRepository.deleteById(trigger.getChangedTransaction().getTransactionCode());
                                            }
                                            /////nan giải khi thêm -> trigger sinh ra -> quay về if thứ nhất -> gửi email
                                            boolean checkVerifyOld = transactionFabrics.stream()
                                                    .anyMatch(
                                                            transactionFabric ->
                                                                    transactionFabric.getId().equals(trigger.getTransaction().getTransactionCode()) &&
                                                                            hyperledgerFabricService.checkTransactionWithTransactionHash(trigger.getTransaction(), transactionFabric.getDataHash())
                                                    );
                                            if (checkVerifyOld)
                                                transactionRepository.save(trigger.getTransaction());
                                            else
                                                transactionRepository.deleteById(trigger.getTransaction().getTransactionCode());
                                            trigger.setChecked(true);
                                            triggerRepository.save(trigger);
                                        }
                                    } else {
                                        trigger.setChecked(true);
                                        triggerRepository.save(trigger);
                                    }
                                } else if (trigger.getType() == TriggerType.DELETE) {
                                    if (checkVerify) {
                                        if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
                                            mailService.sendMailTransactionNotVerifyToAdmin(requestSendTransactionNotVerify);
                                            /////nan giải
                                            transactionRepository.save(trigger.getTransaction());
                                            trigger.setChecked(true);
                                            triggerRepository.save(trigger);
                                        }
                                    } else {
                                        trigger.setChecked(true);
                                        triggerRepository.save(trigger);
                                    }
                                }
                            } catch (Exception e) {
                                trigger.setGot(false);
                                triggerRepository.save(trigger);
                            }
                        }
                );
            }
        } catch (Exception e) {
            triggerRepository.saveAll(triggerLogs.stream().peek(tr -> tr.setGot(false)).collect(Collectors.toList()));
            LOGGER.error(e.getMessage());
        }
    }
}
