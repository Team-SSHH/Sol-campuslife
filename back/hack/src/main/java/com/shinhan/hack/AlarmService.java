package com.shinhan.hack;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.proxy.Dto.FxrateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@EnableScheduling
@Service
@RequiredArgsConstructor
public class AlarmService {

    private final LoginRepository studentRepository;
    private final FirebaseMessaging firebaseMessaging;
    private final Map<String, String> nationalityAndCode = new HashMap<>(){{
        put("한국", "KRW");
        put("미국", "USD");
        put("일본", "JPY");
        put("유럽", "EUR");
        put("영국", "GBP");
        put("호주", "AUD");
        put("뉴질랜드", "NZD");
        put("캐나다", "CAD");
        put("홍콩", "HKD");
        put("싱가폴", "SGD");
        put("타이완", "TWD");
        put("중국", "CNY");
        put("스위스", "CHF");
        put("스웨덴", "SEK");
        put("덴마크", "DKK");
        put("노르웨이", "NOK");
        put("사우디", "SAR");
        put("U.A.E", "AED");
        put("말레이시아", "MYR");
        put("인도네시아", "IDR");
        put("필리핀", "PHP");
        put("태국", "THB");
        put("인도", "INR");
        put("러시아", "RUB");
        put("헝가리", "HUF");
        put("베트남", "VND");
        put("남아프리카", "ZAR");
        put("카자흐스탄", "KZT");
        put("브라질", "BRL");
        put("몽골", "MNT");
        put("폴란드", "PLN");
        put("카타르", "QAR");
        put("칠레", "CLP");
        put("터키", "TRY");
        put("체코", "CZK");
        put("이집트", "EGP");
        put("이스라엘", "ILS");
        put("케냐", "KES");
        put("파키스탄", "PKR");
        put("방글라데시", "BDT");
        put("네팔", "NPR");
        put("마카오", "MOP");
    }};



//    @Scheduled(fixedRate = 180000)
    @Scheduled(cron = "0 0 8,12,18 * * *")
    public void sendAlarm() {
        List<String> tokenList = studentRepository.findTokenAll();

        final RestTemplate restTemplate = new RestTemplate();
        final HttpHeaders headers = new HttpHeaders();
        final String requestBody = "{\n" +
                "    \"dataHeader\":{\n" +
                "        \"apikey\":\"2023_Shinhan_SSAFY_Hackathon\"\n" +
                "    },\n" +
                "    \"dataBody\":{\n" +
                "        \"조회일자\":\"20230916\"\n" +
                "    }\n" +
                "}";

        String apiUrl = "https://shbhack.shinhan.com/v1/search/fxrate/number";

        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<FxrateDto> rateList = restTemplate.postForEntity(apiUrl, requestEntity, FxrateDto.class);

        for (String token : tokenList
        ) {
            if (token.isEmpty()) continue;

            List<String> nation = studentRepository.findNationalityByToken(token);

            if (nation.isEmpty()) continue;

            String rateBody = "";

            for (String na: nation
                 ) {
                String currency = nationalityAndCode.get(na);
                if(currency.equals("KRW"))continue;

                for (FxrateDto.Rate rate :rateList.getBody().getDataBody().getRateList()
                     ) {
                    if (rate.getCurrencyCode().equals(currency)) {
                        rateBody = rateBody + currency + "\n" + "매매기준환율 : " + rate.getTradeBuyRate() + "\n"
                                + "대미환산율 : " + rate.getTradeSellRate() + "\n";
                    }
                }
            }
            if(rateBody.isEmpty()) continue;


            System.out.println(rateBody);
            Notification notification = Notification.builder()
                    .setTitle("환전 알람")
                    .setBody(rateBody)
                    .build();

            Message message = Message.builder()
                    .setToken(token)  // 친구의 FCM 토큰 설정
                    .setNotification(notification)
                    .build();
            try {
                firebaseMessaging.send(message);
            } catch (FirebaseMessagingException e) {
                e.printStackTrace();
                throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
            }
        }
    }
}
