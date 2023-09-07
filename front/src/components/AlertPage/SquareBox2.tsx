import React from "react";
import styled from "styled-components";

interface SquareBox2Props {
  idx: number;
}

interface Alarm2Props {
  alarmData: {
    title: string;
    date: string;
    name: string;
    money: number;
    complete: boolean;
  };
  id: number;
}

const SquareBox2Component = styled.div<SquareBox2Props>`
  width: 96%;
  height: 16%;
  background-color: #fff;
  position: absolute;
  left: 2%;
  //   padding-left: 4%;
  //   padding-top: 2%;
  border-radius: 20px;
  top: ${(props) => props.idx * 18 + 2}%;
`;
const SquareBox2: React.FC<Alarm2Props> = (props) => {
  const alarmData = props.alarmData;

  return (
    <SquareBox2Component idx={props.id}>
      <div className="alertBoxWrapper">
        <div>{alarmData.date}</div>
        {/* <div> */}
        <span className="alertTitle">{alarmData.title}</span>
        <span>
          <span className="alertName">{alarmData.name} </span>
          <span className="alertMoney">
            <span>{alarmData.money}</span> 원
          </span>
        </span>
        {/* </div> */}
      </div>
    </SquareBox2Component>
  );
};

export default SquareBox2;
