package com.shinhan.hack.history.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class KakaoLocalResponse {

    @JsonProperty("documents")
    private List<KakaoDocument> documents;


}