import React, { useState } from "react";
import api from "../utils/api";
import { Navigate, useNavigate } from "react-router-dom";

import "./styles/LoginPage.scss";

const LoginPage = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(studentId, password);
    navigate("/Main");
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await api.post("/", {
  //       studentId,
  //       password,
  //     });
  //     if (response.status === 200) {
  //       navigate("/Main");
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return (
    <div className="Login">
      <form className="loginform">
        <div className="loginsegment logindiv">
          <h1>Login</h1>
        </div>

        <label className="loginlabel">
          <input
            className="logininput"
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <label className="loginlabel">
          <input
            className="logininput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="red loginbutton" type="button" onClick={handleLogin}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
