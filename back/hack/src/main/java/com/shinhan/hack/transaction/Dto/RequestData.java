package com.shinhan.hack.transaction.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestData {
    private DataHeader dataHeader;
    private DataBody dataBody;



}




