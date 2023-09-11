import React, { useState } from "react";
// import api1 from "../utils/api1";
import axios from "axios";

const useSendOneWon = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOneWon = async (studentId: Number) => {
    console.log("여깅ㅂ니더");
    console.log(studentId);
    try {
      const response = await axios.put(
        `https://api.solcampuslife.store/sshh/remittance/${studentId}/won1`
      );
      // const response = await api1.put(`/sshh/remittance/${studentId}/won1`, {
      //   content: "비밀번호486",
      // });
      console.log(response);

      if (response.status === 200) {
        console.log("success");
        setIsSuccess(!isSuccess);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { isSuccess, handleSendOneWon };
};

export default useSendOneWon;
