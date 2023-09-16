import React, { useState, useEffect } from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import SquareBox from "../components/MainPage/SquareBox";
import "./styles/MainPage.css";
import wallet from "../assets/wallet.png";
import dollar from "../assets/dollar.png";
import dashboard from "../assets/dashboard.png";
import place from "../assets/place.png";
import click from "../assets/click.png";
import friend from "../assets/friend.png";
import { getMessaging, getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "@firebase/app-check";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import api1 from "../utils/api1";

const MainPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(loginuser);
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });

  const postDeviceToken = async (studentId: any, token: any) => {
    console.log(deviceToken);
    try {
      const response = await api1.post(`/sshh/login/${studentId}/token`, {
        token,
      });
      console.log(response);
    } catch (error) {
      // 에러 처리 부분 추가 필요.
      console.error(error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(
        function (registration) {
          console.log("Service Worker is ready :^)", registration);
          const messaging = getMessaging();

          // 페이지 로드 후 일정 시간이 지난 후에 fetchDeviceToken() 함수를 호출
          setTimeout(async () => {
            await getDeviceToken(userData.studentId, messaging);
          }, 5000); // 여기서 3000은 3초를 의미합니다. 필요에 따라 조절 가능합니다.
        },
        function (err) {
          console.log("Service Worker is not ready :^(", err);
        }
      );
    }
  }, [userData.studentId]);

  async function getDeviceToken(studentId: any, messaging: any) {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    setDeviceToken({
      token: token,
    });
    console.log(token);
    postDeviceToken(studentId, token);
  }
  return (
    <div>
      <StudentId />
      <div className="box1" onClick={() => navigate("/StudentId")}>
        <SquareBox
          color="#C7D6FF"
          text="ID 월렛"
          src={wallet}
          width="210px"
          height="150px"
        />
      </div>
      <div className="box2" onClick={() => navigate("/Fxrate")}>
        <SquareBox
          color="#FFF7AC"
          text="환전 신청"
          src={dollar}
          width="140px"
          height="150px"
        />
      </div>
      <div className="box3" onClick={() => navigate("/ConsumeLog")}>
        <SquareBox
          color="#FFCBF4"
          text="소비 로그"
          src={dashboard}
          width="160px"
          height="150px"
        />
      </div>
      <div className="box4" onClick={() => navigate("/FavoritePlace")}>
        <SquareBox
          color="#B7FF95"
          text="건국대생이 자주 가는"
          src={place}
          width="190px"
          height="150px"
        />
      </div>
      <div className="box5" onClick={() => navigate("/BankLocation")}>
        <SquareBox
          color="#B9A3F9"
          text="가까운 영업점"
          src={click}
          width="195px"
          height="150px"
        />
      </div>
      <div className="box6" onClick={() => navigate("/RegisterFriend")}>
        <SquareBox
          color="rgb(255 180 174)"
          text="학생증 교환"
          src={friend}
          width="150px"
          height="150px"
        />
      </div>
    </div>
  );
};

export default MainPage;
