import React, { useEffect } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import NavBar from "./components/common/NavBar";
import { getMessaging, onMessage } from "firebase/messaging";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};
const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);
console.log(firebase);
console.log(messaging);
function App() {
  onMessage(messaging, (payload) => {
    console.log("푸시 알림을 받았습니다:", payload);

    // 클릭 액션 확인
    const clickAction = payload.data?.click_action || "DEFAULT_ACTION";

    // 클릭 액션에 따라 메인 페이지 열기 또는 다른 작업 수행
    if (clickAction === "OPEN_MAIN_PAGE") {
      // 새 창으로 메인 페이지 열기
      window.open("/Main");
    } else if (clickAction === "OPEN_DUTCHPAY_PAGE") {
      // 다른 페이지 열기 또는 다른 작업 수행
      // 예: window.open("/SomeOtherPage", "_blank");
    } else {
      // 알 수 없는 클릭 액션 처리 또는 기본 작업 수행
      console.error("알 수 없는 클릭 액션:", clickAction);
    }
  });

  return (
    <div className="App">
      <RecoilRoot>
        <AppRouter />
      </RecoilRoot>
    </div>
  );
}

export default App;
