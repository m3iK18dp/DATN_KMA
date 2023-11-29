package kma.datn.Listener.configures;

import kma.datn.Listener.utils.HandleJsonFile;

import java.util.HashMap;
import java.util.Map;

public class GlobalConfig {
    private final static Map<String, Object> config = new HashMap<String, Object>() {{
        put("binlog_hostname", "localhost");
        put("binlog_port", 3306);
        put("binlog_schema", "datn_hyperwallet");
        put("binlog_username", "readTriggerDATN");
        put("binlog_password", "123456");
        put("url_backend", "http://localhost:8080");
        put("url_mail_server", "http://localhost:3001");
        put("info_table", HandleJsonFile.getAllFromJson());
    }};

    public static void setConfig(String key, Object value) {
        config.put(key, value);
    }

    public static Object getConfig(String key) {
        return config.get(key);
    }
}
