import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isRemittanceModalOpen, selectedFriend } from "../../stores/atoms";

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
  height: 18%;
  background-color: #fff;
  position: absolute;
  left: 2%;
  //   padding-left: 4%;
  //   padding-top: 2%;
  border-radius: 20px;
  top: ${(props) => props.idx * 20 + 2}%;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 10%;
  right: 5%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.25rem;
  width: 6rem;
  font-size: 1rem;
  background: #6e96ff;
`;

const SquareBox2: React.FC<Alarm2Props> = (props) => {
  const alarmData = props.alarmData;
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const setSelectedFriend = useSetRecoilState(selectedFriend);

  const remittance = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
    // setSelectedFriend(friendData);
    // 데이터 정보 가공해서 다시 보내기
  };
  return (
    <SquareBox2Component idx={props.id}>
      {/* {alarmData.complete && <div className="alertBoxWrapperDone"></div>} */}
      {/* <div className="alertBoxWrapper"> */}
      <div
        className={`alertBoxWrapper ${
          alarmData.complete && alarmData.title === "더치페이"
            ? "alertBoxWrapperDone"
            : ""
        }`}
      >
        <div>{alarmData.date}</div>
        <span className="alertTitle">{alarmData.title}</span>
        <span>
          <span className="alertName">{alarmData.name} </span>
          <span className="alertMoney">
            <span>{alarmData.money}</span> 원
          </span>
        </span>
        {!alarmData.complete && (
          <StyledButton
            onClick={(e) => {
              e.stopPropagation();
              remittance();
            }}
          >
            송금하기
          </StyledButton>
        )}
      </div>
    </SquareBox2Component>
  );
};

export default SquareBox2;
