import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isRemittanceModalOpen,
  selectedFriend,
  loginuser,
} from "../../stores/atoms";
import { FriendType } from "../../types/DataType";
import useRemittance from "../../hooks/useRemittance";
import useAlertDutchPay from "../../hooks/useAlertDutchPay";
const StyledButton = styled.button`
  position: absolute;
  bottom: 10%;
  right: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.8rem;
  width: 6.5rem;
  font-size: 0.9rem;
  background: #6e96ff;
`;

interface EnvelopProps {
  isdutch: boolean;
  text1: string;
  text2: string;
}

const Envelop: React.FC<EnvelopProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const [userData, setUserData] = useRecoilState(loginuser);
  const friendData = useRecoilValue<Array<FriendType>>(selectedFriend);
  const [value, setValue] = useState<number>(0);

  const { handleRemittance } = useRemittance();

  const { handleAlertDutchPay } = useAlertDutchPay();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleClick = () => {
    const extractFriends = (data: FriendType[]): number[] => {
      return data.map((item) => item.studentId);
    };
    const new_friends = extractFriends(friendData);

    //더치페이일때
    if (props.isdutch) {
      handleAlertDutchPay(userData.studentId, new_friends, value);
    } else {
      handleRemittance(
        userData.studentId,
        friendData[0].studentId,
        value,
        "더치페이"
      );
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="remittanceEnvelope">
        <div className="triangle-left"></div>
        <div className="triangle-right"></div>
        <div className="remittanceContentTitle">{props.text1}</div>

        <StyledButton onClick={handleClick}>{props.text2}</StyledButton>
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

export default Envelop;
