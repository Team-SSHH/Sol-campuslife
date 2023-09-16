import React, { useEffect, useState } from "react";
import "./StudentId.css";
import SmartId from "../common/SmartId";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import { getMyMoney } from "../../services/apiService";
import { formatCurrency } from "../common/formatCurrency";
import usePostGPS from "../../hooks/usePostGPS";
import usePostGPSState from "../../hooks/usePostGPSState";
import useGPSLocation from "../../hooks/useGPSLocation";

const StudentIdComponent = styled.div`
  width: 90%;
  height: 20%;
  // background-color: #fff;
  position: absolute;
  left: 5%;
  top: 7%;
  border-radius: 20px;
  // border: solid 0.1rem;
`;

const StudentId = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [balance, setBalance] = useState(0);
  const [isToggled, setIsToggled] = useState(userData.locationState);

  const { handlePutMyLocationState } = usePostGPSState();
  const { handlePutMyLocation } = usePostGPS();
  const MyLocation = useGPSLocation();

  useEffect(() => {
    // true일때만 공유하는 것
    // true 일 때, 내 위치 바뀔 때 마다 데이터 저장하기
    if (isToggled === true) {
      console.log("디비에 저장한다.", isToggled);
      handlePutMyLocation(userData.studentId);
    }
  }, [MyLocation]);

  useEffect(() => {
    setIsToggled(userData.locationState);
  }, [userData.locationState]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    fetchMyMoney(userData.studentId);
  }, [userData.balance]);

  const fetchMyMoney = async (studentId: Number) => {
    try {
      const response = await getMyMoney(studentId);
      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const onToggle = () => {
    const nextToggleState = !isToggled;

    // 토글을 먼저 바꾼다.
    setIsToggled(nextToggleState);

    // 바꾼걸 저장한다.
    handlePutMyLocationState(userData.studentId, nextToggleState);
    setUserData((prevData: any) => ({
      ...prevData,
      locationState: nextToggleState,
    }));

    console.log("토글토글", isToggled);
    console.log("내위치가 진짜 바로 바겻나요", userData.locationState);
  };

  return (
    <StudentIdComponent>
      <div className={` ${isFlipped ? "flipped" : ""}`}>
        <div className="front">
          <div
            className={`toggle-button ${isToggled ? "toggled" : ""}`}
            onClick={(e) => {
              onToggle();
              e.stopPropagation();
            }}
          >
            <div className="toggle-circle"></div>
          </div>

          <SmartId
            name={userData.name}
            major={userData.major}
            studentId={userData.studentId}
            grade={userData.grade}
            imageUrl={userData.imageUrl}
          />
          <div className="flipment" onClick={handleClick}>
            카드 보기 &gt;
          </div>
        </div>

        <div className="back">
          <div className="cardInfo">
            <div>계좌번호 : {userData.bankNumber}</div>
            <div>잔액 : {formatCurrency(balance)} 원</div>
          </div>
          <div className="flipment" onClick={handleClick}>
            학생증 앞면 보기 &gt;
          </div>
        </div>
      </div>
    </StudentIdComponent>
  );
};

export default StudentId;
