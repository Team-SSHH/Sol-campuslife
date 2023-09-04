import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fxrate from "../components/FxratePage/Fxrate";
import DiscountRate from "../components/FxratePage/DiscountRate";
import KrwAmount from "../components/FxratePage/KrwAmount";
import { fxlist } from "../utils/fxlist";
import Fxratepush from "../components/FxratePage/Fxratepush";
import "./styles/FxratePage.css";

const FxratePage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="fxrate-container">
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
      <div>
        <p>Exchange Rate</p>
        <Fxrate selectedCurrency={selectedCurrency} />
        <p>나의 우대율</p>
      </div>
      <div className="card-w">
        <div className="discount-box card neumorphism">
          <p>나의 우대율</p>
          <DiscountRate selectedCurrency={selectedCurrency} />
          <KrwAmount selectedCurrency={selectedCurrency} />
        </div>
      </div>
      <br />
      <br />
      <Link to={"/Fxrequest"}>
        <button>환전신청 및 결과 조회</button>
      </Link>
      {/* <Fxratepush /> */}
    </div>
  );
};

export default FxratePage;
