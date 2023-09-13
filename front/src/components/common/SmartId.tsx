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
  studentId: number;
  grade: number;
  imageUrl: string;
}

const SmartId: React.FC<SmartIdProps> = ({
  name,
  major,
  studentId,
  grade,
  imageUrl,
}) => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const URL = "https://api.solcampuslife.store/static/images/";
  return (
    <SmartIdComponent>
      <div className="smartIdName">모바일 학생증 {name}</div>
      <div className="smartIdWrppaer">
        <img src={URL + imageUrl} alt="My image" style={{ width: "22%" }} />
        <div className="smartIdContent">
          <div>
            <span>{major}과</span>
            <div>
              <span>재학생 ({grade}학년)</span>
            </div>
          </div>
          <div>
            <span>{name} </span>
            <span>{studentId}</span>
          </div>
        </div>
      </div>
    </SmartIdComponent>
  );
};

export default SmartId;
