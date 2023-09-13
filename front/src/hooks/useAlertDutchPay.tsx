import React, { useState } from "react";
import { postDutchPay } from "../services/apiService";

const useAlertDutchPay = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleAlertDutchPay = async (
    studentId: Number,
    friendList: Array<Number>,
    amount: Number
  ) => {
    try {
      const response = await postDutchPay(studentId, friendList, amount);
      console.log(response);
      setIsSuccess(!isSuccess);
      return true;
    } catch (error) {
      return false;
    }
  };
  return { isSuccess, handleAlertDutchPay };
};

export default useAlertDutchPay;
