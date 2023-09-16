import React, { useEffect, useState } from "react";
import api1 from "../../utils/api1";
import styled from "styled-components";
import { loginuser } from "../../stores/atoms";
import { useRecoilState } from "recoil";

interface KwData {
  우대율: string;
}

const StyledButton = styled.button`
  position: absolute;
  top: 23%;
  right: 30%;
  outline: none;
  border: none;
  border-radius: 15px;
  margin-left: 5%;
  color: #fff;
  height: 2rem;
  width: 5rem;
  font-size: 1rem;
  background: #6e96ff;
`;

interface KrwAmountProps {
  selectedCurrency: string;
  inputAmount: string;
}

const KrwAmountRequest: React.FC<KrwAmountProps> = ({
  selectedCurrency,
  inputAmount,
}) => {
  const [kwData, setKwData] = useState<KwData | null>(null);
  const [userData] = useRecoilState(loginuser);
  const [exchangeAmount, setExchangeAmount] = useState<string>("");

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
      console.log(response.data.dataBody);
      setExchangeAmount(response.data.dataBody.원화예상금액 + "원");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = () => {
    kwtRate();
  };

  useEffect(() => {
    setExchangeAmount("");
  }, [selectedCurrency]);

  return (
    <div className="kwdiv">
      <StyledButton onClick={handleBtnClick}>확인</StyledButton>
      <div className="fxrateTitle fxrateMoney">
        원화예상금액 <span> {exchangeAmount}</span>
      </div>
    </div>
  );
};

export default KrwAmountRequest;
