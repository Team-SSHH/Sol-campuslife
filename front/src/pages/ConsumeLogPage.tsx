import React from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../utils/atoms";

const ConsumeLogPage = () => {
  const [userData, setUserData] = useRecoilState(loginuser);

  // const allConsumeLog = async () => {
  //   try {
  //     const response = await api.get("/api2/sshh/history/"");
  //     if (response.status === 200) {
  //    setAllLog(response.data)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const myConsumeLog = async () => {
  //   try {
  //     const response = await api.get(`/api2/sshh/history/${loginuser.student_id}`);
  //     if (response.status === 200) {
  //      setMyLog(response.data)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return <div>ConsumeLogPage</div>;
};

export default ConsumeLogPage;
