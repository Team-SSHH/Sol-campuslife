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
  //   display: flex;
  //   flex-direction: column;
  overflow-y: scroll;
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

const DetailModal: React.FC<DetailModalProps> = ({ detailInfo, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        {detailInfo.map((info, index) => (
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
            {/* <span className="squarebox2Amount"> {info.remittanceTime}</span> 원 */}
          </div>
        ))}
      </ModalContent>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalWrapper>
  );
};

export default DetailModal;
