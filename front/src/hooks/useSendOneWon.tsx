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
      return true;
    } catch (error) {
      console.log(9999);
      console.log("dfdfd111111");
      return false;
    }
  };
  return { isSuccess, handleSendOneWon, password };
};

export default useSendOneWon;
