import React, { useEffect, useState } from "react";
import api from "../../utils/api";

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

  const [exchangeAmount, setExchangeAmount] = useState<string>("");

  const disdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0505",
      환전통화: selectedCurrency,
      환전금액: inputAmount,
      거래자성명: "홍길동",
      생년월일: "19930222",
      휴대폰번호: "0101111111",
    },
  };

  const kwtRate = async () => {
    try {
      const response = await api.post("/search/fx/krw-amount", disdata);
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
    <div>
      <button onClick={handleBtnClick}>원화예상금액보기</button>
      <p>원화예상금액: {exchangeAmount}</p>
    </div>
  );
};

export default KrwAmountRequest;
