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
    <div className="fxrequestContainer">
      <div className="fxrateBox1">
        <div className="fxrateTitle">환전신청</div>
        <label htmlFor="currencySelect">통화 선택</label>
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
      {/* <StyledButton onClick={handleBtnClick}>원화예상금액보기</StyledButton> */}
      <div className="fxrateBox1">
        <div className="fxrateTitle">환전할 금액을 입력해주세요</div>
        <input
          className="krwInput"
          type="number"
          placeholder="금액을 입력하세요."
          value={inputAmount}
          onChange={handleInputChange}
        />
        <KrwAmountRequest
          selectedCurrency={selectedCurrency}
          inputAmount={inputAmount}
        />
        {/* <hr className="fxrateHr" /> */}

        <Fxrequest
          selectedCurrency={selectedCurrency}
          inputAmount={inputAmount}
        />
      </div>
      <div className="fxrateBox1">
        <Fxresult />
      </div>
    </div>
  );
};

export default FxrequestPage;
