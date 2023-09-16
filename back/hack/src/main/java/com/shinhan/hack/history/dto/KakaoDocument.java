package com.shinhan.hack.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoDocument {

    @JsonProperty("category_name")
    private String category;


    @JsonProperty("y")
    private String y;


    @JsonProperty("x")
    private String x;


    @JsonProperty("address_name")
    private String addressName;

}