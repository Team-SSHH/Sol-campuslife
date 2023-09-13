import React, { useEffect, useState } from "react";
import "./StudentId.css";
import sanghoon from "../../assets/sanghoon.png";
import SmartId from "../common/SmartId";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import { getMyMoney } from "../../services/apiService";

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

  return (
    <StudentIdComponent>
      <div
        className={` ${isFlipped ? "flipped" : ""}`}
        // onClick={handleClick}
      >
        <div className="front">
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
            <div>잔액 : {balance}원</div>
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
