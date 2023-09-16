import React, { useEffect, useState } from "react";
import api1 from "../../utils/api1";
import styled from "styled-components";
import { formatCurrency } from "../common/formatCurrency";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";

interface KwData {
  우대율: string;
}
const StyledButton = styled.button`
  // position: relative;
  // top: 2%;
  // right: 5%;
  outline: none;
  border: none;
  border-radius: 15px;
  margin-left: 5%;
  color: #fff;
  height: 2rem;
  width: 8rem;
  font-size: 0.8rem;
  background: #6e96ff;
`;

interface KrwAmountProps {
  selectedCurrency: string;
}

const KrwAmount: React.FC<KrwAmountProps> = ({ selectedCurrency }) => {
  const [kwData, setKwData] = useState<KwData | null>(null);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [exchangeAmount, setExchangeAmount] = useState<string>("");
  const [userData] = useRecoilState(loginuser);

  const disdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0505",
      환전통화: selectedCurrency,
      환전금액: inputAmount,
      거래자성명: userData.name,
      생년월일: "19930222",
      휴대폰번호: userData.phoneId,
    },
  };

  const kwtRate = async () => {
    try {
      const response = await api1.post("/sshh/fx/krw-amount", disdata);
      // console.log(response.data.dataBody);
      setExchangeAmount(response.data.dataBody.원화예상금액 + "원");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBtnClick();
    }
  };

  const handleBtnClick = () => {
    kwtRate();
  };

  useEffect(() => {
    setInputAmount("");
    setExchangeAmount("");
  }, [selectedCurrency]);

  return (
    <div className="krwAmountWrapper">
      <input
        className="krwInput"
        type="text"
        placeholder=" 금액을 입력하세요."
        value={inputAmount}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <StyledButton onClick={handleBtnClick}>원화예상금액보기</StyledButton>
      <p className="fxrateTitle">
        원화예상금액
        <span> {exchangeAmount}</span>
      </p>
    </div>
  );
};

export default KrwAmount;
