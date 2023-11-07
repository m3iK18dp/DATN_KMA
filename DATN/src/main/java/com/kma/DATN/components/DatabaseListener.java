package com.kma.DATN.components;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class DatabaseListener {
    @Autowired
    private final TriggerRepository triggerRepository;
    @Autowired
    private final TransactionRepository transactionRepository;
    //    @Autowired
//    private final TransactionExtraRepository transactionExtraRepository;
    @Autowired
    private final IHyperledgerFabricService hyperledgerFabricService;
    @Autowired
    private final IMailService mailService;
    @Autowired
    private final UserRepository userRepository;

    @Scheduled(fixedRate = 1000)
    public void readDatabase() {
        List<TriggerLog> triggerLogs = triggerRepository.findTriggerNotCheck();
        System.out.println("Reading the database..." + triggerLogs.stream().map(Object::toString).toList());
        if (!triggerLogs.isEmpty()) {
            String token = hyperledgerFabricService.loginUser("00000000", "Org1");
            List<TransactionFabric> transactionFabrics = hyperledgerFabricService
                    .getTransactionByIds(triggerLogs.stream().map(triggerLog ->
                            triggerLog.getType() == TriggerType.UPDATE ? triggerLog.getChangedTransaction().getTransactionCode() : triggerLog.getTransaction().getTransactionCode()
                    ).collect(Collectors.toList()), token);
            triggerLogs.forEach(trigger -> {
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
                List<TriggerLog> checkSendMail = triggerRepository.checkSendMail(trigger.getTransaction().getTransactionCode());
                if (trigger.getType() == TriggerType.INSERT) {
                    if (checkVerify) {
                        if (
                                !checkSendMail.isEmpty() ||
                                        mailService.sendMailTransactionVerify(new RequestSendTransactionVerify(userCurrent.getEmail(), trigger.getTransaction(), trigger.getCreatedAt()))
                        ) {
                            if (trigger.getTransaction().getTransactionType() == TransactionType.TRANSFER && checkSendMail.isEmpty())
                                mailService.sendMailTransactionVerifyToRecipient(
                                        new RequestSendTransactionVerify(userRepository.getUserByAccountNumber(trigger.getTransaction().getRecipientAccountNumber()).getEmail(),
                                                trigger.getTransaction(), trigger.getCreatedAt())
                                );
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
                            transactionRepository.deleteById(trigger.getTransaction().getTransactionCode());
                            trigger.setChecked(true);
                            triggerRepository.save(trigger);
                        }
                    }
                } else if (trigger.getType() == TriggerType.UPDATE) {
                    if (!checkVerify) {
                        requestSendTransactionNotVerify.setChangedTransaction(trigger.getChangedTransaction());
                        if (mailService.sendMailTransactionNotVerify(requestSendTransactionNotVerify)) {
                            if (!trigger.getChangedTransaction().getTransactionCode().equals(trigger.getTransaction().getTransactionCode())) {
                                transactionRepository.deleteById(trigger.getChangedTransaction().getTransactionCode());
                            }
                            /////nan giải khi thêm -> trigger sinh ra -> quay về if thứ nhất -> gửi email
                            transactionRepository.save(trigger.getTransaction());
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
            });
        }
    }
}
