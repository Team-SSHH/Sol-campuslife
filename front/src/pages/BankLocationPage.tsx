import React, { useEffect } from "react";
import "./styles/BankLocationPage.css";

declare const kakao: any;
const BankLocationPage = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.541981, 127.078959),
      level: 3,
    };

    new kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="BankLocationPage">
      <div className="mapCard">
        <h2>가까운 영업점</h2>
        <div id="map" style={{ width: "90%", height: "400px" }}></div>
      </div>
      <div className="nearLoation">
        <h1>신한은행 @@점</h1>
        <h1>신한은행 @@점</h1>
        <h1>신한은행 @@점</h1>
        <h1>신한은행 @@점</h1>
      </div>
    </div>
  );
};

export default BankLocationPage;
