import React, { useState } from "react";
import { getReceiveDutchPayDetail } from "../services/apiService";
import { DutchType } from "../types/DataType";

const useHavetoDutchPay = () => {
  const [getHaveToData, setGetHaveToData] = useState<Array<DutchType>>();

  const handleHaveToDutchPay = async (studentId: Number) => {
    try {
      const response = await getReceiveDutchPayDetail(studentId);

      setGetHaveToData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleHaveToDutchPay, getHaveToData, setGetHaveToData };
};

export default useHavetoDutchPay;
