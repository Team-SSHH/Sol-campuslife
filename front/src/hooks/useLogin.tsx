import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiService";

const useLogin = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useRecoilState(loginuser);

  const navigate = useNavigate();

  // const handleLogin = () => {
  //   console.log(studentId, password);
  //   navigate("/Main");
  // };
  const handleLogin = async () => {
    try {
      const response = await postLogin(studentId, password);

      setUserData(response.data);
      navigate("/Main");
    } catch (error) {
      // 에러 처리 부분 추가 필요.
      console.error(error);
    }
  };

  return { studentId, password, setStudentId, setPassword, handleLogin };
};

export default useLogin;
