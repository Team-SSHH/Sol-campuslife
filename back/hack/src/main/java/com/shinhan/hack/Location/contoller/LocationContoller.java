package com.shinhan.hack.Location.contoller;

import com.shinhan.hack.Location.dto.LocationDto;
import com.shinhan.hack.Location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sshh/location")
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class LocationContoller {

    private final LocationService locationService;

    @PutMapping("/{studentId}/save")
    public ResponseEntity<LocationDto.Response> saveLocation(
            @PathVariable("studentId") Long studentId,
            @RequestBody LocationDto.SitePost sitePost
    ){
        // 내 위치를 실시간으로 DB에 저장
        LocationDto.Response response = locationService.saveLocation(studentId, sitePost);

        return ResponseEntity.ok(response);
    }
//
//    @PutMapping("/{studentId}/state")
//    public
}
