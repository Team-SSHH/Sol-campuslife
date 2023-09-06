import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";

const FriendAdd = () => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [resultData, setResultData] = useState("");

  // const getFriend = async () => {
  //   try {
  //     const response = await api.get(`/api2/sshh/freinds/${loginuser.student_id}/certify/${freindStudentId}`);
  //     if (response.status === 200) {
  //
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const addFriend = async () => {
  //   try {
  //     const response = await api.post(`/api2/sshh/freinds/${loginuser.student_id}/store/${freindStudentId}`);
  //     if (response.status === 200) {
  //        setResultData(`${freindStudentId}님과 친구 추가에 성공했습니다`)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return <div></div>;
};

export default FriendAdd;
