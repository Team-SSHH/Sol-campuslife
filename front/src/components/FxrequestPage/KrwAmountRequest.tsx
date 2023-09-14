import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Kwrate.css";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import api1 from "../../utils/api1";

interface KwData {
  우대율: string;
}

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
      setExchangeAmount(response.data.dataBody.원화예상금액);
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
      <button className="Kwbtn" onClick={handleBtnClick}>
        원화예상금액보기
      </button>
      <p>원화예상금액: {exchangeAmount}</p>
    </div>
  );
};

export default KrwAmountRequest;
