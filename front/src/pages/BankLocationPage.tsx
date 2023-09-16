import React, { useEffect, useState } from "react";
import "./styles/BankLocationPage.css";
import useShinhanLocation from "../hooks/useShinhanLocation";
import { BankLocationType } from "../types/DataType";
import { useRecoilValue } from "recoil";
import { loginuser } from "../stores/atoms";
import useGPSLocation from "../hooks/useGPSLocation";
import call from "../assets/call.png";
import school from "../assets/school.png";
import location from "../assets/location.png";

declare const kakao: any;

const BankLocationPage = () => {
  const [cityName, setCityName] = useState("서울");

  const { BanknearbyKonKuk, BanknearbyMyLocation } =
    useShinhanLocation(cityName);

  const MyLocation = useGPSLocation();

  console.log(BanknearbyMyLocation);
  console.log(BanknearbyKonKuk);
  console.log(MyLocation);

  const [map, setMap] = useState<null | any>(null);
  const UserData = useRecoilValue(loginuser);

  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options;
        if (cityName === "서울") {
          options = {
            center: new kakao.maps.LatLng(37.541981, 127.078959),
            level: 6,
          };
        } else if (cityName === "경기") {
          // MyLocation 값이 유효한지 확인하세요.
          options = {
            center: new kakao.maps.LatLng(
              MyLocation.latitude,
              MyLocation.longitude
            ),
            level: 7,
          };
        }

        const createdMap = new kakao.maps.Map(container, options);

        setMap(createdMap);
      });
    };
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=9d2f5e313f7480e75807d0e7aa01170d";
    document.head.appendChild(script);
  }, [cityName]);

  // Add another useEffect for BanknearbyKonKuk state update
  useEffect(() => {
    if (map) {
      // Check if the map is already initialized
      (cityName === "서울" ? BanknearbyKonKuk : BanknearbyMyLocation).forEach(
        (location: BankLocationType) => {
          // 원하는 위치의 위도와 경도
          const markerPosition = new kakao.maps.LatLng(
            parseFloat(location.지점위도),
            parseFloat(location.지점경도)
          );

          // 마커를 생성
          let marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);

          let infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width :auto; text-align:center;font-size:8px; padding :5px;color:#000;">신한은행 ' +
              location.지점명 +
              "</div>",
            removable: true,
          });
          infowindow.open(map, marker);
        }
      );
    }
  }, [BanknearbyKonKuk, BanknearbyMyLocation, cityName]);
  function moveTo(name: string) {
    let location = (
      cityName === "서울" ? BanknearbyKonKuk : BanknearbyMyLocation
    ).find((item: BankLocationType) => item.지점명 === name);
    if (location && map) {
      map.panTo(
        new kakao.maps.LatLng(
          parseFloat(location.지점위도),
          parseFloat(location.지점경도)
        )
      );
    }
  }

  function handleButtonClick() {
    setCityName((prev) => (prev === "서울" ? "경기" : "서울")); // cityName을 서로 전환
  }

  return (
    <div className="BankLocationPage">
      <div className="mapCard">
        <h3 className="title">
          {cityName === "서울" ? UserData.university : "현재 위치에서"}에서
          가까운 영업점
        </h3>
        <span className="bankSwitch" onClick={handleButtonClick}>
          {cityName === "서울" ? (
            <div>내 위치기준 보기</div>
          ) : (
            <div>학교 기준 보기</div>
          )}
        </span>
      </div>
      <div
        id="map"
        style={{ width: "90%", height: "300px", margin: "auto" }}
      ></div>
      <div className="bankName">
        <h3 className="title" style={{ color: "white" }}>
          {cityName === "서울" ? UserData.university : "현재 위치에서"}에서
          가까운 지점입니다.
        </h3>

        <div className="bankCard">
          {(cityName === "서울" ? BanknearbyKonKuk : BanknearbyMyLocation).map(
            (location: BankLocationType, index) => (
              <div className="locationWrapper">
                <h3
                  key={index}
                  onClick={() => moveTo(location.지점명)}
                  className="box"
                >
                  신한은행 {location.지점명} 지점
                </h3>
                <a href={`tel:${location.지점대표전화번호}`}>
                  <img src={call} alt="callImg" style={{ width: "40px" }} />
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BankLocationPage;
