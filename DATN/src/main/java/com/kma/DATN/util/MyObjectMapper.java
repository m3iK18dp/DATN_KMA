package com.kma.DATN.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class MyObjectMapper {
    public static <T> T readValue(String data, Class<T> valueType) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        return objectMapper.readValue(data, valueType);
    }
//    ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.findAndRegisterModules();
//
//    //        0=String, 1=Song, 2=Page<Song>, 3=byte[], 4=User, 5=Page<User>, 6=Boolean, 7=Role, 8=List<Role>
//    Class<?>[] classes = new Class[]{
//            String.class,
//            Song.class,
//            Page.class,
//            byte[].class,
//            User.class,
//            Page.class,
//            Boolean.class,
//            Role.class,
//            Page.class
//    };
//        if (value < classes.length) {
//        Class<?> clazz = classes[value];
//        if (clazz.equals(Page.class)) {
//            JavaType type = objectMapper.getTypeFactory().constructParametrizedType(clazz, clazz, classes[value - 1]);
//            return objectMapper.convertValue(data, type);
//        } else {
//            return objectMapper.convertValue(data, (Class<T>) clazz);
//        }
//    } else {
//        throw new RuntimeException("Convert Data Response Failed");
//    }
}
