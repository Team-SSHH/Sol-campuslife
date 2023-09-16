import React, { useState } from "react";
import { putDutchPay } from "../services/apiService";

const useDutchPay = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleDutchPay = async (
    studentId: Number,
    friendId: Number,
    dutchId: String,
    dutchAmount: String
  ) => {
    try {
      const responose = await putDutchPay(
        studentId,
        friendId,
        dutchId,
        dutchAmount
      );
      setIsSuccess(!isSuccess);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { handleDutchPay, isSuccess };
};

export default useDutchPay;
