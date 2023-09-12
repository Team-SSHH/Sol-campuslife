import React, { useState } from "react";
import { putSendOneWon } from "../services/apiService";

const useSendOneWon = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOneWon = async (studentId: Number) => {
    console.log("여깅ㅂ니더");
    console.log(studentId);
    try {
      const response = await putSendOneWon(studentId);
      console.log(response);
      console.log("success");
      setIsSuccess(!isSuccess);
    } catch (error) {
      console.error(error);
    }
  };
  return { isSuccess, handleSendOneWon };
};

export default useSendOneWon;
