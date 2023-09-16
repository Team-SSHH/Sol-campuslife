import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { fxlist } from "../../utils/fxlist";
import "./Fxratepush.css";

const Fxratepush: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      {/* <p>알리미 설정</p> */}
      <label htmlFor="currencySelect">통화 선택</label>
      <div className="select-container">
        <select
          id="currencySelect"
          name="currencySelect"
          onChange={handleCurrencyChange}
          value={selectedCurrency}
          size={1}
        >
          {fxlist.map((currency) => (
            <option key={currency.통화코드} value={currency.통화코드}>
              {currency.통화코드명}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Fxratepush;
