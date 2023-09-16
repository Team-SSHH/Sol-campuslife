import React from "react";
import "./styles/LoginPage.scss";
import "./styles/LoginPage.css";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { studentId, password, setStudentId, setPassword, handleLogin } =
    useLogin();

  return (
    <div className="logincontainer">
      <div className="Login">
        <form className="loginform">
          <div className="loginsegment logindiv">
            <h1>LOGIN</h1>
          </div>

          <label className="loginlabel">
            <input
              className="logininput"
              type="text"
              placeholder="학번을 입력해주세요."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </label>
          <label className="loginlabel">
            <input
              className="logininput"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="red loginbutton"
            type="button"
            onClick={handleLogin}
          >
            로그인{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
