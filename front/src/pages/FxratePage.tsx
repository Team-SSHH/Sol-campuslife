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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fxrate-container">
      <button className="fxratepush" onClick={handleModalToggle}>
        알림 설정
      </button>
      {/* 모달창 */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* 모달 내용 */}
            <Fxratepush />
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}

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
        <button className="fxratebtn">환전신청 및 결과 조회</button>
      </Link>
    </div>
  );
};

export default FxratePage;
