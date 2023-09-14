import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./Kwrate.css";
import "./kwrate.scss";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import api1 from "../../utils/api1";

interface KwData {
  우대율: string;
}

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
      setExchangeAmount(response.data.dataBody.원화예상금액);
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
    <div>
      <input
        className="kwinput"
        type="text"
        value={inputAmount}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="Kwbtn" onClick={handleBtnClick}>
        원화예상금액보기
      </button>
      <p>원화예상금액: {exchangeAmount}</p>
    </div>
  );
};

export default KrwAmount;
