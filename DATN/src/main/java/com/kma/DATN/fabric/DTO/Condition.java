package com.kma.DATN.fabric.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Condition {
    @JsonProperty("ID")
    private String id;
    @JsonProperty("CreateTime")
    private String createTime;
}
