import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiService";
import { getMessaging, getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "@firebase/app-check";
import api1 from "../utils/api1";

const useLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);
  const messaging = getMessaging();
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });

  const navigate = useNavigate();

  async function getDeviceToken(studentId: any) {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      setDeviceToken({
        token: token,
      });
      console.log(token);
      postDeviceToken(studentId, token);
    } catch (error) {
      console.error("Failed to get device token:", error);

      // 오류가 발생한 후에 다시 시도합니다.
      setTimeout(() => getDeviceToken(studentId), 3000); // 여기서 5000은 5초 후에 다시 시도하게 됩니다. 필요에 따라 조절 가능합니다.
    }
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
      const response = await postLogin(studentId, password);

      setUserData(response.data);
      getDeviceToken(response.data.studentId);
      navigate("/Main");
    } catch (error) {
      // 에러 처리 부분 추가 필요.
      console.error(error);
    }
  };

  return { studentId, password, setStudentId, setPassword, handleLogin };
};

export default useLogin;
