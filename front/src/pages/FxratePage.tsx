import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fxrate from "../components/FxratePage/Fxrate";
import DiscountRate from "../components/FxratePage/DiscountRate";
import KrwAmount from "../components/FxratePage/KrwAmount";
import { fxlist } from "../utils/fxlist";
import Fxratepush from "../components/FxratePage/Fxratepush";
import "./styles/FxratePage.css";
import { registerServiceWorker } from "../utils/notification";
import { AppCheckTokenResult } from "@firebase/app-check";
// import { getMessaging, getToken } from "firebase/messaging";
// import firebase from "firebase/app";
import axios from "axios";
import api1 from "../utils/api1";

const FxratePage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });
  // const messaging = getMessaging();

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCurrency(event.target.value);
  };
  async function handleModalToggle() {
    const permission = await Notification.requestPermission();

    registerServiceWorker();
    setIsModalOpen(!isModalOpen);
  }
  // async function getDeviceToken() {
  //   const token = await getToken(messaging, {
  //     vapidKey: process.env.REACT_APP_VAPID_KEY,
  //   });
  //   setDeviceToken({
  //     token: token,
  //   });
  // }

  // const postDeviceToken = async () => {
  //   console.log(deviceToken);
  //   try {
  //     const response = await api1.post(
  //       "/sshh/login/201403808/token",
  //       deviceToken.token
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     // 에러 처리 부분 추가 필요.
  //     console.error(error);
  //   }
  // };

  // const push = async () => {
  //   console.log(deviceToken);
  //   try {
  //     const response = await api1.post(
  //       "/sshh/login/201403808/token",
  //       deviceToken.token
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     // 에러 처리 부분 추가 필요.
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("token", deviceToken);
  //   if (deviceToken.token) {
  //     postDeviceToken();
  //   }
  // }, [deviceToken]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fxrate-container">
      <button className="fxratepush Kwbtn" onClick={handleModalToggle}>
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
      <button>친구추가</button>
      <Link to={"/Fxrequest"}>
        <button className="fxratebtn Kwbtn">환전신청 및 결과 조회</button>
      </Link>
    </div>
  );
};

export default FxratePage;
