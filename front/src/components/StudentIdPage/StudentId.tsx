import React, { useState } from "react";
import "./StudentId.css";
import sanghoon from "../../assets/sanghoon.png";
import SmartId from "../common/SmartId";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";

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

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const lsh = {
    name: userData.name,
    major: `${userData.major}과`,
    grade: `${userData.grade}학년`,
    number: userData.studentId,
  };
  console.log(userData);

  return (
    <StudentIdComponent>
      <div
        className={` ${isFlipped ? "flipped" : ""}`}
        // onClick={handleClick}
      >
        <div className="front">
          <SmartId
            name={lsh.name}
            major={lsh.major}
            number={lsh.number}
            grade={lsh.grade}
          />
          <div className="flipment" onClick={handleClick}>
            카드 보기 &gt;
          </div>
        </div>

        <div className="back">
          <div className="cardInfo">
            <div>계좌번호: 93087254624787</div>
            <div>잔액: 500원</div>
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
