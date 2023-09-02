import React, { useEffect, useState } from "react";
import axios from "axios";

interface RateData {
  통화코드: string;
}

const Fxrate: React.FC = () => {
  const [ratesData, setRatesData] = useState<RateData | null>(null);

  useEffect(() => {
    fxrate();
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
    </div>
  );
};

export default Fxrate;
