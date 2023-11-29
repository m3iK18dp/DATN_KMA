package kma.datn.Listener.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;

public class HandleJsonFile {

    public static JsonNode getAllFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.createObjectNode();
        File file = new File("infoTable.json");
        try {
            rootNode = objectMapper.readTree(file);
        } catch (Exception e) {
            /////
        }
        return rootNode;
    }

    public static String getValueFromJson(long key) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.createObjectNode();
            File file = new File("infoTable.json");
            rootNode = objectMapper.readTree(file);
            JsonNode valueNode = rootNode.get(String.valueOf(key));
            if (valueNode != null) {
                return valueNode.asText();
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public static JsonNode saveValueInJson(long key, String value) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode rootNode = objectMapper.createObjectNode();
        File file = new File("infoTable.json");
        if (file.exists()) {
            JsonNode existingNode = objectMapper.readTree(file);
            rootNode = (ObjectNode) existingNode;
        }
        rootNode.put(String.valueOf(key), value);
        objectMapper.writeValue(file, rootNode);
        return rootNode;
    }

}
