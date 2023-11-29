package com.kma.DATN.fabric.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kma.DATN.configures.GlobalConfig;
import com.kma.DATN.fabric.DTO.AddTransactionRequest;
import com.kma.DATN.fabric.DTO.Condition;
import com.kma.DATN.fabric.DTO.TransactionFabric;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.models.Transaction;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class HyperledgerFabricServiceImpl implements IHyperledgerFabricService {
    static final String URL_HYPERLEDGER_FABRIC_API = GlobalConfig.getConfig("url_hyperledger_fabric").toString();

    @Override
    public String convertLocalDateTimeToTimeTimeInGolang(LocalDateTime time) {
        return time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }

    @Override
    public String convertTransactionToJSON(Transaction transaction) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(transaction);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error when covert transaction to json");
        }
    }

    @Override
    public String convertTransactionToTransactionHash(Transaction transaction) {
        return sha256(convertTransactionToJSON(transaction));
    }

    @Override
    public boolean checkTransactionWithTransactionHash(Transaction transaction, String transactionHash) {
        return sha256(convertTransactionToJSON(transaction)).equals(transactionHash);
    }

    private String sha256(String data) {
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

    private String convertQueryToUrlType(String jsonString) {
        return jsonString.replaceAll("'", "\\\\\"");
    }

    @Override
    public void registerUser(String userName, String org) {
        HttpHeaders headers = new HttpHeaders();
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("username", userName);
        requestBody.add("orgName", org);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<ResponseObject<String>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API + "/users",
                            HttpMethod.POST,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<String> responseObject = responseEntity.getBody();
//        try {
            assert responseObject != null;
            if (Objects.equals(responseObject.getStatus(), "ok")) {
                /////
//                BinaryFileHandler.writeStringToFile(responseObject.getData(), 1);
                /////
            } else throw new RuntimeException("Error when register user in fabric network");
//        } catch (IOException e) {
//            throw new RuntimeException("Error when writing token to storage");
//        }
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public Map<String, String> registerUserAndSecret(String userName, String org) {
        HttpHeaders headers = new HttpHeaders();
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("username", userName);
        requestBody.add("orgName", org);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<ResponseObject<Map<String, String>>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API + "/users/register",
                            HttpMethod.POST,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<Map<String, String>> responseObject = responseEntity.getBody();
//        try {
            assert responseObject != null;
            if (Objects.equals(responseObject.getStatus(), "ok")) {
                /////
//                BinaryFileHandler.writeStringToFile(responseObject.getData().get("token"), 1);
//                BinaryFileHandler.writeStringToFile(responseObject.getData().get("secret"), 0);
                /////
                return responseObject.getData();
            } else throw new RuntimeException("Error when register user in fabric network");
//        } catch (IOException e) {
//            throw new RuntimeException("Error when writing token to storage");
//        }
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public String loginUser(String userName, String org) {
        HttpHeaders headers = new HttpHeaders();
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("username", userName);
        requestBody.add("orgName", org);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<ResponseObject<String>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API + "/users/login",
                            HttpMethod.POST,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<String> responseObject = responseEntity.getBody();
//        try {
            assert responseObject != null;
            if (Objects.equals(responseObject.getStatus(), "ok")) {
                /////
//                BinaryFileHandler.writeStringToFile(responseObject.getData(), 1);
//                System.out.println("===============================================");
                /////
                return responseObject.getData();
            } else throw new RuntimeException("Error when register user in fabric network");
//        } catch (IOException e) {
//            throw new RuntimeException("Error when writing token to storage");
//        }
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean addTransaction(Transaction transaction, String tokenFabric) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tokenFabric);

        AddTransactionRequest requestBody = new AddTransactionRequest();
        requestBody.setFcn("CreateTransaction");
        requestBody.setChainCodeName("transaction_cc");
        requestBody.setChannelName("mychannel");
        requestBody.setArgs(List.of(new String[]{
                transaction.getTransactionCode(),
                convertLocalDateTimeToTimeTimeInGolang(transaction.getTransactionTime()),
                convertTransactionToTransactionHash(transaction)
        }));

        HttpEntity<AddTransactionRequest> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<ResponseObject<?>> responseEntity = new RestTemplate().exchange(
                    URL_HYPERLEDGER_FABRIC_API + "/channels/mychannel/chaincodes/transaction_cc",
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<>() {
                    }
            );

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                ResponseObject<?> responseObject = responseEntity.getBody();
                if (responseObject != null && "ok".equals(responseObject.getStatus())) {
                    return true;
                } else {
                    throw new RuntimeException("Error when calling to Fabric: " + responseObject);
                }
            } else {
                throw new RuntimeException("Error when calling to Fabric. Status code: " + responseEntity.getStatusCode());
            }
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }


    @Override
    public boolean updateTransaction(Transaction transaction, String tokenFabric) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " +
                tokenFabric
        );
        AddTransactionRequest requestBody = new AddTransactionRequest();
        requestBody.setFcn("UpdateTransactionById");
        requestBody.setChainCodeName("transaction_cc");
        requestBody.setChannelName("mychannel");
        requestBody.setArgs(
                List.of(
                        new String[]{
                                transaction.getTransactionCode(),
                                convertLocalDateTimeToTimeTimeInGolang(transaction.getTransactionTime()),
                                convertTransactionToTransactionHash(transaction)
                        }
                )
        );
        HttpEntity<AddTransactionRequest> requestEntity = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<ResponseObject<?>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API + "/channels/mychannel/chaincodes/transaction_cc",
                            HttpMethod.POST,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<?> responseObject = responseEntity.getBody();
            assert responseObject != null;
            return Objects.equals(responseObject.getStatus(), "ok");
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public List<TransactionFabric> getAllTransaction(String transactionCode, LocalDateTime transactionTime, String tokenFabric) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " +
                tokenFabric
        );
        HttpEntity<String> requestEntity = new HttpEntity<>("", headers);
        try {
            ResponseEntity<ResponseObject<List<TransactionFabric>>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API
                                    + "/channels/mychannel/chaincodes/transaction_cc?fcn=GetAllTransaction",
                            HttpMethod.GET,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<List<TransactionFabric>> responseObject = responseEntity.getBody();
            assert responseObject != null;
            return responseObject.getData();
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public TransactionFabric getTransactionById(String transactionCode, LocalDateTime transactionTime, String tokenFabric) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " +
                tokenFabric
        );
        HttpEntity<String> requestEntity = new HttpEntity<>("", headers);
        try {
            ResponseEntity<ResponseObject<List<TransactionFabric>>> responseEntity
                    = new RestTemplate().exchange
                    (
                            URL_HYPERLEDGER_FABRIC_API
                                    + "/channels/mychannel/chaincodes/transaction_cc?"
                                    + "fcn=GetTransactionById" + "&"
                                    + "args=[\"" + transactionCode + "\",\"" + convertLocalDateTimeToTimeTimeInGolang(transactionTime) + "\"]",
                            HttpMethod.GET,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<List<TransactionFabric>> responseObject = responseEntity.getBody();
            assert responseObject != null;
            return responseObject.getData().get(0);
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }

    @Override
    public List<TransactionFabric> getTransactionByIds(List<String> transactionIds, String tokenFabric) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String output = objectMapper.writeValueAsString(transactionIds).replace("\"", "'");
            String query = "{'selector':{'ID':{'$in':" + output + "}}}";
            return getTransactionForQuery(query, tokenFabric);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<TransactionFabric> getTransactionByListIdAndCreateTime(List<Condition> conditions, String tokenFabric) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String output = objectMapper.writeValueAsString(conditions).replace("\"", "'");
            String query = "{'selector':{'$or':" + output + "}}";
            return getTransactionForQuery(query, tokenFabric);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<TransactionFabric> getTransactionForQuery(String query, String tokenFabric) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " +
                tokenFabric
        );
        AddTransactionRequest requestBody = new AddTransactionRequest();
        HttpEntity<AddTransactionRequest> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<ResponseObject<List<TransactionFabric>>> responseEntity
                    = restTemplate.exchange
                    (
                            UriComponentsBuilder.fromHttpUrl(URL_HYPERLEDGER_FABRIC_API + "/channels/mychannel/chaincodes/transaction_cc")
                                    .queryParam("fcn", "GetTransactionForQuery")
                                    .queryParam("args", "[\"" + convertQueryToUrlType(query) + "\"]").toUriString(),
                            HttpMethod.GET,
                            requestEntity,
                            new ParameterizedTypeReference<>() {
                            }
                    );
            if (responseEntity.getStatusCode() != HttpStatus.OK)
                throw new RuntimeException("Error when calling to Fabric");
            ResponseObject<List<TransactionFabric>> responseObject = responseEntity.getBody();
            assert responseObject != null;
            return responseObject.getData();
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to communicate with Fabric: " + e.getMessage(), e);
        }
    }
}
