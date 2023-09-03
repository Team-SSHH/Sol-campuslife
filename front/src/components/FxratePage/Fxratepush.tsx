import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { fxlist } from "../../utils/fxlist";

const Fxratepush: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      <div>
        <p>알리미 설정</p>
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
    </div>
  );
};

export default Fxratepush;
