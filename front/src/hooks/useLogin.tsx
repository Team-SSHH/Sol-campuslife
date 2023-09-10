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
  //127.0.0.1:8080/

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://13.124.41.92:8080/sshh/login", {
        studentId,
        password,
      });
      if (response.status === 200) {
        console.log(response);
        setUserData(response.data);
        localStorage.setItem("user", response.data);
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
