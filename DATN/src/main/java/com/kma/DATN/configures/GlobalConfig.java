package com.kma.DATN.configures;

import com.kma.DATN.models.Role;
import com.kma.DATN.models.User;
import com.kma.DATN.models.UserStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

public class GlobalConfig {
    private final static Map<String, Object> config = new HashMap<String, Object>() {{
        put("url_hyperledger_fabric", "http://192.168.152.130:4000");
        put("url_mail_server", "http://localhost:3001");
        put("user_init_first", User.builder()
                .id("00000000")
                .firstName("Phạm Đoàn")
                .lastName("Kiếm")
                .email("kiempham1256@gmail.com")
                .password(new BCryptPasswordEncoder().encode("admin_Abcd@1234"))
                .address("17A Cộng Hòa")
                .phoneNumber("0373926165")
                .status(UserStatus.ACTIVE)
                .role(Role.ADMIN)
                .build()
        );
    }};

    public static void setConfig(String key, Object value) {
        config.put(key, value);
    }

    public static Object getConfig(String key) {
        return config.get(key);
    }
}
