import React, { useEffect, useState } from "react";
import api from "../../utils/api";

interface RateData {
  통화코드: string;
}
interface AllRateData {
  통화CODE: string;
}
interface FxrateProps {
  selectedCurrency: string;
}
const Fxrate: React.FC<FxrateProps> = ({ selectedCurrency }) => {
  const [ratesData, setRatesData] = useState<RateData | null>(null);
  const [allratesData, setAllRatesData] = useState<RateData | null>(null);

  const alldata = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      조회일자: "20230901",
    },
  };

  useEffect(() => {
    allfxrate(selectedCurrency);
  }, [selectedCurrency]);

  const allfxrate = async (currency: string) => {
    try {
      const response = await api.post("/search/fxrate/number", alldata);
      console.log(response);
      setAllRatesData(response.data.dataBody.환율리스트);
      console.log(response.data.dataBody.환율리스트);

      if (Array.isArray(response.data.dataBody.환율리스트)) {
        const foundItem = response.data.dataBody.환율리스트.find(
          (item: AllRateData) => item.통화CODE.includes(currency)
        );
        if (foundItem) {
          console.log("찾은 항목:", foundItem);
          setRatesData(foundItem);
        } else {
          console.log(`${currency}를 포함한 항목을 찾지 못했습니다.`);
          setRatesData(null);
        }
      } else {
        console.log("dataBody.리스트가 배열이 아닙니다.");
        setRatesData(null);
      }
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
      {renderRates()}
    </div>
  );
};

export default Fxrate;
