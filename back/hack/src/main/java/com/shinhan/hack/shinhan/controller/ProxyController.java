package com.shinhan.hack.shinhan.controller;
import com.shinhan.hack.shinhan.Dto.*;
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

    private final RestTemplate restTemplate = new RestTemplate();
    private final HttpHeaders headers = new HttpHeaders();

    @PostMapping("/shinhan/fxrate/number")
    public ResponseEntity<?> getFxrate(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/fxrate/number";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<FxrateDto> response = restTemplate.postForEntity(apiUrl, requestEntity, FxrateDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/branch/city")
    public ResponseEntity<?> getCity(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/branch/city";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<BranchCityDto> response = restTemplate.postForEntity(apiUrl, requestEntity, BranchCityDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/fx/discount-rate")
    public ResponseEntity<?> getDiscount(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/fx/discount-rate";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<DiscountDto> response = restTemplate.postForEntity(apiUrl, requestEntity, DiscountDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/fx/krw-amount")
    public ResponseEntity<?> getKrw(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/fx/krw-amount";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<KrwDto> response = restTemplate.postForEntity(apiUrl, requestEntity, KrwDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/fx/request-list")
    public ResponseEntity<?> getRequestList(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/fx/request-list";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<RequestListDto> response = restTemplate.postForEntity(apiUrl, requestEntity, RequestListDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/request/fx")
    public ResponseEntity<?> getRequest(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/request/fx";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<RequestDto> response = restTemplate.postForEntity(apiUrl, requestEntity, RequestDto.class);

        return ResponseEntity.ok(response.getBody());
    }
    @PostMapping("/branch/list")
    public ResponseEntity<?> getBranch(@RequestBody String requestBody) {

        String apiUrl = "https://shbhack.shinhan.com/v1/search/branch/list";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<BranchListDto> response = restTemplate.postForEntity(apiUrl, requestEntity, BranchListDto.class);

        return ResponseEntity.ok(response.getBody());
    }

}