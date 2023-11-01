package com.kma.DATN;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kma.DATN.fabric.DTO.TransactionFabric;
import com.kma.DATN.models.Transaction;
import com.kma.DATN.models.TransactionStatus;
import com.kma.DATN.models.TransactionType;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

public class Main {
    static final String URL_HYPERLEDGER_FABRIC_API = "http://192.168.152.129:4000";

    public static void main(String[] args) {
//        List<Condition> conditions = new ArrayList<Condition>();
//        conditions.add(new Condition("TX123456", "2023-09-22T11:50:10Z"));
//        conditions.add(new Condition("TX123457", "2023-09-23T10:50:10Z"));
//        ObjectMapper objectMapper = new ObjectMapper();
//        String query = null;
//        try {
//            String output = objectMapper.writeValueAsString(conditions).replace("\"", "'");
//            query = "{'selector':{'$or':" + output + "}}";
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e.getMessage());
//        }
//        HttpHeaders headers = new HttpHeaders();
//        try {
//            headers.set("Authorization", "Bearer " + BinaryFileHandler.readFile(1));
//        } catch (IOException e) {
//            throw new RuntimeException("Error when reading token from storage");
//        }
//        AddTransactionRequest requestBody = new AddTransactionRequest();
//        HttpEntity<AddTransactionRequest> requestEntity = new HttpEntity<>(requestBody, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<ResponseObject<List<TransactionFabric>>> responseEntity
//                = restTemplate.exchange
//                (
//                        UriComponentsBuilder.fromHttpUrl(URL_HYPERLEDGER_FABRIC_API + "/channels/mychannel/chaincodes/transaction_cc")
//                                .queryParam("fcn", "GetTransactionForQuery")
//                                .queryParam("args", "[\"" + convertQueryToUrlType(query) + "\"]").toUriString(),
//                        HttpMethod.GET,
//                        requestEntity,
//                        new ParameterizedTypeReference<>() {
//                        }
//                );
//        ResponseObject<List<TransactionFabric>> responseObject = responseEntity.getBody();
//
//        assert responseObject != null;
//
//        System.out.println(responseObject.getData());

        ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
        Transaction transaction = new Transaction();
        transaction.setAmount(500000L);//
        transaction.setTransactionCode("2b5e454db7");
        transaction.setTransactionTime(LocalDateTime.now());
        transaction.setSenderAccountNumber("3c94282d");//
        transaction.setSenderFullName("Phạm Đoàn Admin");//
        transaction.setRecipientAccountNumber("40ff7af2");//
        transaction.setRecipientFullName("Pham Doan Kiem");//
        transaction.setDescription("Send money to Pham Doan Kiem");//
        transaction.setTransactionType(TransactionType.TRANSFER);//
        transaction.setTransactionStatus(TransactionStatus.SUCCESS);//
        try {
            TransactionFabric transactionFabric = new TransactionFabric(
                    "2b5e454db7", "2023-10-31T18:57:52Z", sha256(objectMapper.writeValueAsString(transaction))
            );
            String dataHash = transactionFabric.getDataHash();
            System.out.println(dataHash);
            System.out.println(objectMapper.writeValueAsString(transaction));
            System.out.println(sha256(objectMapper.writeValueAsString(transaction)).equals(dataHash));
            transaction.setAmount(500001L);
            System.out.println(objectMapper.writeValueAsString(transaction));
            System.out.println(sha256(objectMapper.writeValueAsString(transaction)).equals(dataHash));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private static String convertQueryToUrlType(String jsonString) {
        return jsonString.replaceAll("'", "\\\\\"");
    }

    public static String sha256(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                String hex = String.format("%02x", b);
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}