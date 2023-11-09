package com.kma.DATN.kafka;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.TriggerLog;
import com.kma.DATN.repositories.TransactionRepository;
import com.kma.DATN.repositories.TriggerRepository;
import com.kma.DATN.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

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
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "java", groupId = "myGroup")
    public void consume(String message) {
        LOGGER.info(String.format("Message received -> %s", message));
        try {
            List<TriggerLog> triggerLogs = objectMapper.readValue(message, new TypeReference<>() {
            });
//            if (!triggerLogs.isEmpty()) {
//                String token = hyperledgerFabricService.loginUser("00000000", "Org1");
//                List<TransactionFabric> transactionFabrics = hyperledgerFabricService
//                        .getTransactionByIds(triggerLogs.stream().map(triggerLog ->
//                                triggerLog.getType() == TriggerType.UPDATE ? triggerLog.getChangedTransaction().getTransactionCode() : triggerLog.getTransaction().getTransactionCode()
//                        ).collect(Collectors.toList()), token);
//                triggerLogs.forEach(trigger -> {
//                    boolean checkVerify = transactionFabrics.stream()
//                            .anyMatch(
//                                    transactionFabric ->
//                                            trigger.getType() == TriggerType.UPDATE ?
//                                                    transactionFabric.getId().equals(trigger.getChangedTransaction().getTransactionCode()) &&
//                                                            hyperledgerFabricService.checkTransactionWithTransactionHash(trigger.getChangedTransaction(), transactionFabric.getDataHash()) :
//                                                    transactionFabric.getId().equals(trigger.getTransaction().getTransactionCode()) &&
//                                                            hyperledgerFabricService.checkTransactionWithTransactionHash(trigger.getTransaction(), transactionFabric.getDataHash())
//                            );
//                    User userCurrent = userRepository.getUserByAccountNumber(trigger.getTransaction().getSenderAccountNumber());
//                    RequestSendTransactionNotVerify requestSendTransactionNotVerify = new RequestSendTransactionNotVerify();
//                    requestSendTransactionNotVerify.setEmail(userCurrent.getEmail());
//                    requestSendTransactionNotVerify.setTime(trigger.getCreatedAt());
//                    requestSendTransactionNotVerify.setTransaction(trigger.getTransaction());
//                    requestSendTransactionNotVerify.setChangedTransaction(trigger.getTransaction());
//                    requestSendTransactionNotVerify.setType(trigger.getType());
//                    List<TriggerLog> checkSendMail = triggerRepository.checkSendMail(trigger.getTransaction().getTransactionCode());
//                    if (trigger.getType() == TriggerType.INSERT) {
//                        if (checkVerify) {
//                            if (
//                                    !checkSendMail.isEmpty() ||
//                                            mailService.sendMailTransactionVerify(new RequestSendTransactionVerify(userCurrent.getEmail(), trigger.getTransaction(), trigger.getCreatedAt()))
//                            ) {
//                                if (trigger.getTransaction().getTransactionType() == TransactionType.TRANSFER && checkSendMail.isEmpty())
//                                    mailService.sendMailTransactionVerifyToRecipient(
//                                            new RequestSendTransactionVerify(userRepository.getUserByAccountNumber(trigger.getTransaction().getRecipientAccountNumber()).getEmail(),
//                                                    trigger.getTransaction(), trigger.getCreatedAt())
//                                    );
////                            transactionExtraRepository.save(
////                                    TransactionExtra.builder()
////                                            .transactionCode(trigger.getTransaction().getTransactionCode())
////                                            .verify(true)
////                                            .sendMail(true)
////                                            .build()
////                            );
//                                trigger.setChecked(true);
//                                triggerRepository.save(trigger);
//                            }
//                        } else {
//                            if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
//                                transactionRepository.deleteById(trigger.getTransaction().getTransactionCode());
//                                trigger.setChecked(true);
//                                triggerRepository.save(trigger);
//                            }
//                        }
//                    } else if (trigger.getType() == TriggerType.UPDATE) {
//                        if (!checkVerify) {
//                            requestSendTransactionNotVerify.setChangedTransaction(trigger.getChangedTransaction());
//                            if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
//                                if (!trigger.getChangedTransaction().getTransactionCode().equals(trigger.getTransaction().getTransactionCode())) {
//                                    transactionRepository.deleteById(trigger.getChangedTransaction().getTransactionCode());
//                                }
//                                /////nan giải khi thêm -> trigger sinh ra -> quay về if thứ nhất -> gửi email
//                                transactionRepository.save(trigger.getTransaction());
//                                trigger.setChecked(true);
//                                triggerRepository.save(trigger);
//                            }
//                        } else {
//                            trigger.setChecked(true);
//                            triggerRepository.save(trigger);
//                        }
//                    } else if (trigger.getType() == TriggerType.DELETE) {
//                        if (checkVerify) {
//                            if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
//                                /////nan giải
//                                transactionRepository.save(trigger.getTransaction());
//                                trigger.setChecked(true);
//                                triggerRepository.save(trigger);
//                            }
//                        } else {
//                            trigger.setChecked(true);
//                            triggerRepository.save(trigger);
//                        }
//                    }
//                });
//            }
        } catch (JsonProcessingException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
