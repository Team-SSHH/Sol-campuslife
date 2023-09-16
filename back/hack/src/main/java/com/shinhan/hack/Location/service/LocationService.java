package com.shinhan.hack.Location.service;

import com.shinhan.hack.Location.dto.LocationDto;
import com.shinhan.hack.Location.mapper.LocationMapper;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LoginRepository studentRepository;
    private final FriendsRepository friendsRepository;
    private final LocationMapper locationMapper;

    public LocationDto.Response saveLocation(Long studentId, LocationDto.SitePost sitePost) {
        // 경도 위도 저장
        studentRepository.setLatitudeAndLongitude(studentId, sitePost.getLatitude(), sitePost.getLongitude());

        // 현재 상태
        Boolean state = studentRepository.findLocationStateById(studentId);

        // 친구 목록
        List<Friends> friendList = friendsRepository.findByCategory_Student_studentId(studentId);
        List<LocationDto.friend> friendsTrue = new ArrayList<>();

        // 친구 들 중 locationState가 True인 친구들을 모두 담아서 보내준다.
        for (Friends fri : friendList
        ) {
            Optional<Student> friendDummy = studentRepository.findByIdAndLocationState(fri.getFriendId());
            if(friendDummy.isEmpty())continue;

            LocationDto.friend friend = locationMapper.toResponse(friendDummy.get());

            double distance = distance(sitePost.getLatitude(), sitePost.getLatitude(), friendDummy.get().getLatitude(), friendDummy.get().getLongitude());
            friend.setDistance(distance);

            friendsTrue.add(friend);
        }

        return LocationDto.Response.builder()
                .locationState(state)
                .friendList(friendsTrue)
                .build();
    }



    private static Double distance(Double lat1, Double lon1, Double lat2, Double lon2) {

        Double theta = lon1 - lon2;
        Double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = rad2deg(Math.acos(dist))* 60 * 1.1515 * 1609.344;

        return dist;
    }

    // This function converts decimal degrees to radians
    private static Double deg2rad(Double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static Double rad2deg(Double rad) {
        return (rad * 180 / Math.PI);
    }
}
