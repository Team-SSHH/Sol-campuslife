import React from "react";
import styled from "styled-components";
import { DutchType } from "../../types/DataType";
import "./DetailModal.css";
import { formatCurrency } from "../common/formatCurrency";

interface DetailModalProps {
  detailInfo: DutchType[];
  onClose: () => void;
}
const ModalWrapper = styled.div`
  position: fixed;
  top: 30%;
  left: 5%;
  width: 90%;
  height: 40%;
  //   background-color: #6e96ff;
  background-color: #fff;
  z-index: 1;
  border: 2px solid #6e96ff;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  overflow-y: scroll;
  flex-direction: column;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 5%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.25rem;
  width: 20%;
  left: 40%;
  font-size: 1rem;
  background: #6e96ff;
`;

const ThStyled = styled.th`
  padding: 0px 20px;
`;

const DetailModal: React.FC<DetailModalProps> = ({ detailInfo, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <table>
          <thead>
            <tr>
              <ThStyled>친구</ThStyled>
              <ThStyled>금액</ThStyled>
              <ThStyled>시간</ThStyled>
            </tr>
          </thead>
          <tbody>
            {detailInfo.map((info, index) => (
              <tr key={index}>
                <td>{info.name}</td>
                <td>{formatCurrency(info.dutchAmount)}</td>
                <td>
                  {info.remittanceState ? info.remittanceTime : "기다리는 중"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {detailInfo.map((info, index) => (
          <div key={index} className="detailModalBox">
            <span className="detailModalName">{info.name} </span>
            <span className="detailModalAmount">
              {" "}
              {formatCurrency(info.dutchAmount)}
            </span>
            원<span> </span>
            <span className="detailModalTime">
              {info.remittanceState ? info.remittanceTime : "기다리는 중"}
            </span>
          </div>
        ))} */}
      </ModalContent>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalWrapper>
  );
};

export default DetailModal;
