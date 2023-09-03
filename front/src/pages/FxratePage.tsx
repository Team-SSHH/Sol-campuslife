import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fxrate from "../components/FxratePage/Fxrate";
import DiscountRate from "../components/FxratePage/DiscountRate";
import KrwAmount from "../components/FxratePage/KrwAmount";
import { fxlist } from "../utils/fxlist";
import Fxratepush from "../components/FxratePage/Fxratepush";

interface RateData {
  통화코드: string;
}

const FxratePage: React.FC = () => {
  const [ratesData, setRatesData] = useState<RateData | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  const data = {
    dataHeader: {
      apikey: "2023_Shinhan_SSAFY_Hackathon",
    },
    dataBody: {
      조회일자: "20230830",
      통화코드: selectedCurrency,
    },
  };

  // const fxrate = async () => {
  //   try {
  //     const response = await api.post("/search/fxrate/day", data);
  //     console.log(response);
  //     // setRatesData(response.data.dataBody);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      FxratePage{" "}
      <div>
        <label htmlFor="currencySelect">통화 선택:</label>
        <select
          id="currencySelect"
          name="currencySelect"
          onChange={handleCurrencyChange}
          value={selectedCurrency}
        >
          {fxlist.map((currency) => (
            <option key={currency.통화코드} value={currency.통화코드}>
              {currency.통화코드명}
            </option>
          ))}
        </select>
      </div>
      <div>통화별환전조회</div>
      <Fxrate selectedCurrency={selectedCurrency} />
      <div>
        <DiscountRate selectedCurrency={selectedCurrency} />
      </div>
      <div>
        <KrwAmount selectedCurrency={selectedCurrency} />
      </div>
      <Link to={"/Fxrequest"}>
        <button>환전신청 및 결과 조회</button>
      </Link>
      <Fxratepush />
    </div>
  );
};

export default FxratePage;
