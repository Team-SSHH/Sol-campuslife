import React, { useEffect, useState } from "react";
import api from "../../utils/api";

interface FxrequestProps {
  selectedCurrency: string;
  inputAmount: string;
}

const Fxrequest: React.FC<FxrequestProps> = ({
  selectedCurrency,
  inputAmount,
}) => {
  const [requestresult, setrequestresult] = useState<string>("");
  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0511",
      환전통화: selectedCurrency,
      거래자성명: "홍길동",
      환전금액: inputAmount,
      수령처: "인천국제공항",
      수령일자: "20230830",
      수령인성명: "홍길동",
      생년월일: "980415",
      휴대폰번호: "01012345678",
      환전수령방법: "1",
    },
  };

  const fxrequest = async () => {
    try {
      const response = await api.post("/request/fx", data);
      console.log(response.data);
      setrequestresult("신청 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = () => {
    fxrequest();
  };

  return (
    <div>
      <p>환전신청</p>
      <button onClick={handleBtnClick}>환전신청하기</button>
      <p>{requestresult}</p>
    </div>
  );
};

export default Fxrequest;
