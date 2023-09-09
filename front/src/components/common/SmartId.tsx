import React from "react";
import styled from "styled-components";

const SmartIdComponent = styled.div`
  // width: 96%;
  position: absolute;
  left: 5%;
  // border-radius: 20px;
  font-weight: bold;
`;

interface SmartIdProps {
  name: string;
  major: string;
  number: number;
  grade: string;
}

const SmartId: React.FC<SmartIdProps> = ({ name, major, number, grade }) => {
  return (
    <SmartIdComponent>
      {/* <div className="frinedInfo"> */}
      <div className="firendName">모바일 학생증 {name}</div>

      <div>{name}의 얼굴</div>
      <div>
        <span>{major}</span>
        <span> </span>
        <span>재학생 ({grade})</span>
      </div>
      <div>
        <span>{name} </span>
        <span>{number}</span>
      </div>
      {/* </div> */}
    </SmartIdComponent>
  );
};

export default SmartId;
