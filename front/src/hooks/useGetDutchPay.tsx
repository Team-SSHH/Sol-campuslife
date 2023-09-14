import React, { useState } from "react";
import { getDutchPay } from "../services/apiService";
import { GetDutchType } from "../types/DataType";

const useGetDutchPay = () => {
  const [getLoadData, setGetLoadData] = useState<Array<GetDutchType>>();
  const handleGetDutchPay = async (studentId: Number) => {
    try {
      const response = await getDutchPay(studentId);
      setGetLoadData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGetDutchPay, getLoadData, setGetLoadData };
};

export default useGetDutchPay;
