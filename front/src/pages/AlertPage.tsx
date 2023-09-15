import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SquareBox2 from "../components/AlertPage/SquareBox2";
import { useRecoilState } from "recoil";
import { isRemittanceModalOpen } from "../stores/atoms";
import "./styles/AlertPage.css";
import { loginuser } from "../stores/atoms";
import RemittanceModal from "../components/StudentIdPage/RemittanceModal";
import useGetDutchPay from "../hooks/useGetDutchPay";
import { GetDutchType, DutchType } from "../types/DataType";
import useHavetoDutchPay from "../hooks/useHavetoDutchPay";
import SquareBox1 from "../components/AlertPage/SquareBox1";

interface ButtonProps {
  right?: number;
  left?: number;
  $activate: boolean;
}
const StyledButton = styled.button<ButtonProps>`
  position: absolute;
  // top: 5%;
  right: ${(props) => props.right}%;
  left: ${(props) => props.left}%;
  outline: none;
  border: none;
  border-radius: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  border: #fff solid 0.3em;

  height: 6%;
  width: 6rem;
  font-size: 1rem;
  // font-weight: bold;
  font-weight: ${(props) => (props.$activate ? "bold" : "")};
  background: ${(props) => (props.$activate ? "#C6D5FF" : "#6e96ff")};
  color: ${(props) => (props.$activate ? "black" : "#fff")};
`;

const Box = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  top: 10%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;
  // background-color: #fff;
`;

const AlertPage = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const [isClicked, setisClicked] = useState<boolean>(true);
  const [userData, setUserData] = useRecoilState(loginuser);

  const { handleGetDutchPay, getLoadData } = useGetDutchPay();
  const [data, setData] = useState<Array<GetDutchType>>();

  const { handleHaveToDutchPay, getHaveToData } = useHavetoDutchPay();
  const [haveToData, setHaveToData] = useState<Array<DutchType>>();

  useEffect(() => {
    handleGetHaveToDutchPay();
  }, []);

  useEffect(() => {
    setData(getLoadData);
  }, [getLoadData]);

  useEffect(() => {
    setHaveToData(getHaveToData);
  }, [getHaveToData]);

  const handleGetDutchPayload = () => {
    setisClicked(true);
    handleGetDutchPay(userData.studentId);
    setData(getLoadData);
  };

  const handleGetHaveToDutchPay = () => {
    setisClicked(false);
    handleHaveToDutchPay(userData.studentId);
    setHaveToData(getHaveToData);
  };

  return (
    <div className="alertWrapper">
      <StyledButton
        left={20}
        $activate={!isClicked}
        onClick={() => handleGetHaveToDutchPay()}
      >
        수신함
      </StyledButton>
      <StyledButton
        right={20}
        $activate={isClicked}
        onClick={() => handleGetDutchPayload()}
      >
        발신함
      </StyledButton>
      {isClicked && (
        <Box>
          {data &&
            [...data]
              .reverse()
              .map((d, index) => <SquareBox2 key={index} alarmData={d} />)}
        </Box>
      )}

      {!isClicked && (
        <Box>
          {haveToData &&
            [...haveToData]
              .reverse()
              .map((d, index) => <SquareBox1 key={index} alarmData={d} />)}
        </Box>
      )}

      {/* {isModalOpen && <RemittanceModal />} */}
    </div>
  );
};

export default AlertPage;
