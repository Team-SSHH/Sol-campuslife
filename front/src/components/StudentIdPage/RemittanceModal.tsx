import React, { useState } from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue } from "recoil";
import { isRemittanceModalOpen, selectedFriend } from "../../stores/atoms";
import "./RemittanceModal.css";
import SmartId from "../common/SmartId";
import { FriendType } from "../../types/DataType";

// interface friendData {
//   name: string;
//   major: string;
//   number: number;
//   grade: number;
// }

const StyledButton = styled.button`
  position: absolute;
  bottom: 10%;
  right: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 3rem;
  width: 6rem;
  font-size: 1.2rem;
  background: #6e96ff;
`;

const RemittanceModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const friendData = useRecoilValue<FriendType>(selectedFriend);
  const [value, setValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    console.log(value);
    setIsModalOpen(false);
  };

  return (
    <div className="remittanceWrapper">
      <div className="remittanceFriend">
        <SmartId
          name={friendData.name}
          major={friendData.major}
          studentId={friendData.studentId}
          grade={friendData.grade}
          imageUrl={friendData.imageUrl}
        />
        {/* <div className="firendName">모바일 학생증 {friendData.name}</div>
        <div className="frinedInfo">
          <div>{friendData.name}의 얼굴</div>

          <div>
            <span>{friendData.major}</span>
            <span> </span>
            <span>재학생 ({friendData.grade})</span>
          </div>
          <div>
            <span>{friendData.name} </span>
            <span>{friendData.number}</span>
          </div>
        </div> */}
      </div>
      <div className="remittanceEnvelope">
        <div className="triangle-left"></div>
        <div className="triangle-right"></div>
        <div className="remittanceContentTitle">간편 송금</div>

        <StyledButton onClick={handleClick}>송금</StyledButton>
      </div>
      <div className="remittanceContent">
        <br />
        <br />
        <div className="remittanceContentMoney">
          <span>
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder="금액을 입력하시오"
            />
          </span>{" "}
          원
        </div>
      </div>
    </div>
  );
};

export default RemittanceModal;
