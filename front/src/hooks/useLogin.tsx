import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import api1 from "../utils/api1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "@firebase/app-check";
import { registerServiceWorker } from "../utils/notification";

const useLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);
  const messaging = getMessaging();
  const navigate = useNavigate();
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });
  // const handleLogin = () => {
  //   console.log(studentId, password);
  //   navigate("/Main");
  // };
  async function getDeviceToken(studentId: any) {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    setDeviceToken({
      token: token,
    });
    console.log(token);
    postDeviceToken(studentId, token);
  }

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
  const handleLogin = async () => {
    try {
      const response = await api1.post("/sshh/login", {
        studentId,
        password,
      });
      if (response.status === 200) {
        setUserData(response.data);
        getDeviceToken(response.data.studentId);
        // localStorage.setItem("user", response.data);
        // console.log(response.data);
        // console.log(userData);
        // console.log(11111111);

        navigate("/Main");
      }
    } catch (error) {
      // 에러 처리 부분 추가 필요.
      console.error(error);
    }
  };

  return { studentId, password, setStudentId, setPassword, handleLogin };
};

export default useLogin;
