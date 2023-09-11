import React, { useEffect, useState } from "react";
import "./styles/BankLocationPage.css";

declare const kakao: any;
const BankLocationPage = () => {
  const bankLocations = [
    {
      name: "신한은행 건국대학교지점",
      lat: 37.541823538263,
      lng: 127.0780213315,
    },
    {
      name: "신한은행 스타시티금융센터",
      lat: 37.538724826635,
      lng: 127.073545050464,
    },
    { name: "신한은행 자양동점", lat: 37.536262795846, lng: 127.083270673746 },
    {
      name: "신한은행 테크노마트점",
      lat: 37.535494638597,
      lng: 127.095657684745,
    },
    { name: "신한은행 ATM 건대본관", lat: 37.543423, lng: 127.075245 },
  ];

  const [map, setMap] = useState<null | any>(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.541981, 127.078959),
      level: 6,
    };

    const createdMap = new kakao.maps.Map(container, options);

    setMap(createdMap);

    bankLocations.forEach((location) => {
      // 원하는 위치의 위도와 경도
      const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);

      // 마커를 생성
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(createdMap);

      let infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="width :auto; text-align:center;font-size:8px; padding :5px;color:#000;">' +
          location.name +
          "</div>",
        removable: true,
      });

      infowindow.open(createdMap, marker);
    });
  }, []);

  function moveTo(name: string) {
    let location = bankLocations.find((item) => item.name === name);
    if (location && map) {
      map.panTo(new kakao.maps.LatLng(location.lat, location.lng));
    }
  }

  return (
    <div className="BankLocationPage">
      <div className="mapCard">
        <h2>가까운 영업점</h2>
        <div
          id="map"
          style={{ width: "90%", height: "300px", margin: "auto" }}
        ></div>
      </div>
      <div className="bankName">
        <h2 style={{ color: "white" }}>건국대학교에서 가까운 지점입니다.</h2>

        <div className="bankCard">
          {bankLocations.map((location, index) => (
            <h3
              key={index}
              onClick={() => moveTo(location.name)}
              className="box"
            >
              {location.name}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankLocationPage;
