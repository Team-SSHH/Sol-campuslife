import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { fxlist } from "../utils/fxlist";
import Fxrequest from "../components/FxrequestPage/Fxrequest";
import KrwAmountRequest from "../components/FxrequestPage/KrwAmountRequest";
import Fxresult from "../components/FxrequestPage/Fxresult";
import "./styles/FxrequestPage.css";

const FxrequestPage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [inputAmount, setInputAmount] = useState<string>("");

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
  };
  return (
    <div className="fxrequest-container">
      <p>환전신청 페이지</p>
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
      <div className="card-w">
        <div className="kwbox card neumorphism">
          <p>원화예상금액보기</p>
          <input type="text" value={inputAmount} onChange={handleInputChange} />
          <KrwAmountRequest
            selectedCurrency={selectedCurrency}
            inputAmount={inputAmount}
          />
        </div>
      </div>
      <div className="card-w">
        <div className="requset-box card neumorphism">
          <p>환전신청</p>
          <Fxrequest
            selectedCurrency={selectedCurrency}
            inputAmount={inputAmount}
          />
        </div>
      </div>
      <div>
        <Fxresult />
      </div>
    </div>
  );
};

export default FxrequestPage;
