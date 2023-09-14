import React, { useEffect } from "react";
import styled from "styled-components";
import { DutchType } from "../../types/DataType";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isRemittanceModalOpen,
  loginuser,
  selectedFriend,
} from "../../stores/atoms";
import useDutchPay from "../../hooks/useDutchPay";

interface SquareBox1Props {}

interface Alarm2Props {
  alarmData: DutchType;
}

const SquareBox1Component = styled.div<SquareBox1Props>`
  width: 96%;
  height: 15%;
  padding-top: 3%;
  padding-bottom: 5%;
  margin-bottom: 5%;
  background-color: #fff;
  // position: absolute;
  left: 2%;
  //   padding-left: 4%;
  //   padding-top: 2%;
  border-radius: 20px;
`;

const StyledButton = styled.button`
  position: relative;
  bottom: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;

  height: 2.25rem;
  width: 6rem;
  font-size: 1rem;
  background: #6e96ff;
`;

const DetailBox = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: flex-end;
  font-size: 1.3rem;
  font-weight: bold;
`;

const SquareBox1: React.FC<Alarm2Props> = (props) => {
  const alarmData = props.alarmData;
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const { handleDutchPay, isSuccess } = useDutchPay();
  // const setSelectedFriend = useSetRecoilState(selectedFriend);

  const remittance = async () => {
    const isSuccessful = await handleDutchPay(
      userData.studentId,
      alarmData.friendId,
      alarmData.dutchId.toString(),
      alarmData.dutchAmount.toString()
    );
    if (isSuccessful) {
      alert("송금이 완료됬습니다.");
      window.location.reload();
    }

    // setIsModalOpen(true);
    // console.log(isModalOpen);
    // 데이터 정보 가공해서 다시 보내기
  };
  return (
    <SquareBox1Component>
      <div className="squarebox2Wrapper">
        <div className="squarebox2Title">
          <span>더치페이</span>

          {alarmData.remittanceState ? (
            // {alarmData.remittanceTime}
            "완료"
          ) : (
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
        <div></div>
        <DetailBox>
          <span>{alarmData.name} </span>
          <span className="squarebox2Amount">{alarmData.dutchAmount}</span>
          <span>원</span>
        </DetailBox>
      </div>
    </SquareBox1Component>
  );
};

export default SquareBox1;
