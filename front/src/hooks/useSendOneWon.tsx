import React, { useState } from "react";
import { putSendOneWon } from "../services/apiService";

const useSendOneWon = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState<string>();
  const handleSendOneWon = async (studentId: Number) => {
    try {
      const response = await putSendOneWon(studentId);
      setIsSuccess(!isSuccess);
      setPassword(response.data.content.split(" : ")[1]);
    } catch (error) {
      console.error(error);
    }
  };
  return { isSuccess, handleSendOneWon, password };
};

export default useSendOneWon;
