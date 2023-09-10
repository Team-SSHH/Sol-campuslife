import React from "react";
import "./styles/LoginPage.scss";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { studentId, password, setStudentId, setPassword, handleLogin } =
    useLogin();
  // console.log(process.env.REACT_APP_FCM_API_KEY);
  // console.log(process.env.REACT_APP_FCM_AUTH_DOMAIN);
  // console.log(process.env.REACT_APP_FCM_PROJECT_ID);
  // console.log(process.env.REACT_APP_FCM_STORAGE_BUCKET);
  // console.log(process.env.REACT_APP_FCM_MESSAGING_SENDER_ID);
  // console.log(process.env.REACT_APP_FCM_APP_ID);
  // console.log(process.env.REACT_APP_FCM_MEASUREMENT_ID);
  return (
    <div className="logincontainer">
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
          <button
            className="red loginbutton"
            type="button"
            onClick={handleLogin}
          >
            Log in{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
