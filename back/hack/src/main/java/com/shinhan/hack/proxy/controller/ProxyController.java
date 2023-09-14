package com.shinhan.hack.proxy.controller;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/sshh")
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class ProxyController {

    @PostMapping("/shinhan/fxrate/number")
    public ResponseEntity<?> proxyRequest(@RequestBody String requestBody) {
        RestTemplate restTemplate = new RestTemplate();
        String apiUrl = "https://shbhack.shinhan.com/v1/search/fxrate/number";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, requestEntity, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}