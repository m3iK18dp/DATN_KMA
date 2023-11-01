package com.kma.DATN.fabric;

import com.kma.DATN.fabric.DTO.Condition;
import com.kma.DATN.fabric.DTO.TransactionFabric;
import com.kma.DATN.models.Transaction;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public interface IHyperledgerFabricService {
    String convertLocalDateTimeToTimeTimeInGolang(LocalDateTime time);

    String convertTransactionToJSON(Transaction transaction);

    String convertTransactionToTransactionHash(Transaction transaction);

    boolean checkTransactionWithTransactionHash(Transaction transaction, String transactionHash);

    void registerUser(String userName, String org);

    Map<String, String> registerUserAndSecret(String userName, String org);

    String loginUser(String userName, String org);

    boolean addTransaction(Transaction transaction, String tokenFabric);

    boolean updateTransaction(Transaction transaction, String tokenFabric);

    List<TransactionFabric> getAllTransaction(String transactionCode, LocalDateTime transactionTime, String tokenFabric);

    TransactionFabric getTransactionById(String transactionCode, LocalDateTime transactionTime, String tokenFabric);

    List<TransactionFabric> getTransactionByIds(List<String> transactionIds, String tokenFabric);

    List<TransactionFabric> getTransactionByListIdAndCreateTime(List<Condition> conditions, String tokenFabric);

    List<TransactionFabric> getTransactionForQuery(String query, String tokenFabric);
}
