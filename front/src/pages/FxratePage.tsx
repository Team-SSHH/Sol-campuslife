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
import { getMessaging, getToken } from "firebase/messaging";
// import firebase from "firebase/app";
import api1 from "../utils/api1";
import styled from "styled-components";

interface ButtonProps {
  top?: string;
  right?: string;
  width: string;
  height?: number;
  fontSize?: number;
}
const StyledButton = styled.button<ButtonProps>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  outline: none;
  border: none;
  border-radius: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;

  height: ${(props) => props.height}rem;
  width: ${(props) => props.width};
  font-size: ${(props) => props.fontSize}rem;
  background: #fac109;
`;

const FxratePage: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });
  const messaging = getMessaging();

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
  async function getDeviceToken() {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    setDeviceToken({
      token: token,
    });
  }

  const postDeviceToken = async () => {
    try {
      const response = await api1.post(
        "/sshh/login/201403808/token",
        deviceToken.token
      );
      console.log(response);
    } catch (error) {
      // 에러 처리 부분 추가 필요.
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("token", deviceToken);
    if (deviceToken.token) {
      postDeviceToken();
    }
  }, [deviceToken]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fxrateContainer">
      <StyledButton
        top="2%"
        right="5%"
        width="20%"
        height={2}
        fontSize={0.8}
        onClick={handleModalToggle}
      >
        알림 설정
      </StyledButton>
      {/* <button className="fxratepush">
        알림 설정
      </button> */}
      {isModalOpen && (
        <div className="fxrateModal">
          <div className="fxrateModalContent">
            <Fxratepush />
            {/* <StyledButton width="26%" height={2} right="2%" top="50%">
              알림신청
            </StyledButton> */}
            <button className="close-button" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}

      <div className="fxrateBox1">
        <div className="fxrateTitle">환율</div>
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
        <Fxrate selectedCurrency={selectedCurrency} />
      </div>

      <div className="fxrateBox1">
        <div className="discountBox">
          <div className="fxrateTitle">나의 우대율</div>
          <DiscountRate selectedCurrency={selectedCurrency} />
          <KrwAmount selectedCurrency={selectedCurrency} />
        </div>
      </div>
      {/* <br />
      <br /> */}
      <Link to={"/Fxrequest"} className="fxrateLink">
        <StyledButton width="50%" height={3} fontSize={1.2}>
          환전신청 및 결과 조회
        </StyledButton>
        {/* <button className="fxratebtn Kwbtn"></button> */}
      </Link>
    </div>
  );
};

export default FxratePage;
