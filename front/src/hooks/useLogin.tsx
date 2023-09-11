import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import api1 from "../utils/api1";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await api1.post("/sshh/login", {
        studentId,
        password,
      });
      if (response.status === 200) {
        setUserData(response.data);
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
