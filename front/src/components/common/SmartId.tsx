import React from "react";
import styled from "styled-components";
import "./SmartId.css";
import sanghoon from "../../assets/sanghoon.png";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";

const SmartIdComponent = styled.div`
  position: absolute;
  left: 5%;
  font-weight: bold;
`;

interface SmartIdProps {
  name: string;
  major: string;
  number: number;
  grade: string;
}

const SmartId: React.FC<SmartIdProps> = ({ name, major, number, grade }) => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const URL = "http://13.124.41.92:8080/static/images/";
  return (
    <SmartIdComponent>
      <div className="smartIdName">모바일 학생증 {name}</div>
      <div className="smartIdWrppaer">
        <img
          src={URL + userData.imageUrl}
          alt="My image"
          style={{ width: "90px" }}
        />
        <div className="smartIdContent">
          <div>
            <span>{major}</span>
            <div>
              <span>재학생 ({grade})</span>
            </div>
          </div>
          <div>
            <span>{name} </span>
            <span>{number}</span>
          </div>
        </div>
      </div>
    </SmartIdComponent>
  );
};

export default SmartId;
