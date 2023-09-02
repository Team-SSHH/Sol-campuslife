import React, { useEffect, useState } from "react";
import axios from "axios";

interface RateData {
  통화코드: string;
}
interface DiscountData {
  통화: string;
  우대율: string;
}

const Fxrate: React.FC = () => {
  const [ratesData, setRatesData] = useState<RateData | null>(null);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [checkData, setCheckData] = useState<DiscountData | null>(null);

  useEffect(() => {
    fxrate();
    discountRate();
  }, []);

  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      조회일자: "20230901",
      통화코드: "USD",
    },
  };

  const disdata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      serviceCode: "T0501",
    },
  };

  const discountRate = async () => {
    try {
      const response = await axios.post(
        "/api1/v1/search/fx/discount-rate",
        disdata
      );
      console.log(response.data.dataBody.리스트);
      // setDiscountData(response.data.dataBody.리스트);

      if (Array.isArray(response.data.dataBody.리스트)) {
        const foundItem = response.data.dataBody.리스트.find(
          (item: DiscountData) => item.통화.includes("USD")
        );
        if (foundItem) {
          console.log("찾은 항목:", foundItem);
          setCheckData(foundItem);
        } else {
          console.log("CAD를 포함한 항목을 찾지 못했습니다.");
        }
      } else {
        console.log("dataBody.리스트가 배열이 아닙니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fxrate = async () => {
    try {
      const response = await axios.post("/api1/v1/search/fxrate/day", data);
      console.log(response.data.dataBody);
      setRatesData(response.data.dataBody);
    } catch (error) {
      console.log(error);
    }
  };

  const renderRates = () => {
    if (!ratesData) return null;
    return Object.entries(ratesData).map(([key, value]) => (
      <p key={key}>
        <strong>{key}:</strong> {value}
      </p>
    ));
  };

  return (
    <div>
      Fxrate
      <div>통화별환전조회</div>
      {renderRates()}
      <div>USD우대율 조회</div>
      {checkData?.우대율}
    </div>
  );
};

export default Fxrate;
