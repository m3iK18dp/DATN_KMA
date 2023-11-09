package com.kma.DATN;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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

//        ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
//        Transaction transaction = new Transaction();
//        transaction.setAmount(500000L);//
//        transaction.setTransactionCode("2b5e454db7");
//        transaction.setTransactionTime(LocalDateTime.now());
//        transaction.setSenderAccountNumber("3c94282d");//
//        transaction.setSenderFullName("Phạm Đoàn Admin");//
//        transaction.setRecipientAccountNumber("40ff7af2");//
//        transaction.setRecipientFullName("Pham Doan Kiem");//
//        transaction.setDescription("Send money to Pham Doan Kiem");//
//        transaction.setTransactionType(TransactionType.TRANSFER);//
//        transaction.setTransactionStatus(TransactionStatus.SUCCESS);//
//        try {
//            TransactionFabric transactionFabric = new TransactionFabric(
//                    "2b5e454db7", "2023-10-31T18:57:52Z", sha256(objectMapper.writeValueAsString(transaction))
//            );
//            String dataHash = transactionFabric.getDataHash();
//            System.out.println(dataHash);
//            System.out.println(objectMapper.writeValueAsString(transaction));
//            System.out.println(sha256(objectMapper.writeValueAsString(transaction)).equals(dataHash));
//            transaction.setAmount(500001L);
//            System.out.println(objectMapper.writeValueAsString(transaction));
//            System.out.println(sha256(objectMapper.writeValueAsString(transaction)).equals(dataHash));
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//        // Chuỗi thời gian ban đầu ở múi giờ ICT
//        String ictTimeStr = "2023-11-01T18:30:22Z";
//
//        // Chuyển đổi sang LocalDateTime
//        LocalDateTime ictLocalDateTime = LocalDateTime.parse(ictTimeStr, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
//
//        // Xác định múi giờ ICT
//        ZoneId ictZone = ZoneId.of("Asia/Ho_Chi_Minh");
//
//        // Chuyển đổi sang múi giờ UTC (0)
//        ZonedDateTime ictZonedDateTime = ictLocalDateTime.atZone(ictZone);
//        ZonedDateTime utcZonedDateTime = ictZonedDateTime.withZoneSameInstant(ZoneOffset.UTC);
//
//        // Định dạng lại thời gian theo chuẩn "yyyy-MM-dd HH:mm:ss.SSS Z"
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS Z");
//        String utcTimeStr = utcZonedDateTime.format(formatter);
//
//        System.out.println(utcTimeStr);
        try {
            // Danh sách các lệnh cần thực hiện
            String[] commands = {"cmd /c cd c:/kafka_2.12-3.6.0 && dir"};

            // Tạo một đối tượng ProcessBuilder với danh sách lệnh
            ProcessBuilder processBuilder = new ProcessBuilder("cmd", "/c", "c:/kafka_2.12-3.6.0/bin/windows/kafka-server-start.bat c:/kafka_2.12-3.6.0/config/server.properties");

            // Chạy các lệnh
            Process process = processBuilder.start();

            // Đọc output từ Command Prompt (nếu cần)
            java.util.Scanner scanner = new java.util.Scanner(process.getInputStream());
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }

            // Đợi quá trình thực hiện lệnh kết thúc
            int exitCode = process.waitFor();
            System.out.println("Exit Code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
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
