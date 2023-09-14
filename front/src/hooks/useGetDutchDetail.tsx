import React, { useState } from "react";
import { getDutchPayDetail } from "../services/apiService";
import { DutchType } from "../types/DataType";

const useGetDutchDetail = () => {
  const [getLoadDetail, setGetLoadDetail] = useState<Array<DutchType>>();

  const handleGetDutchDetail = async (studentId: Number, dutchId: Number) => {
    try {
      const response = await getDutchPayDetail(studentId, dutchId);
      setGetLoadDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleGetDutchDetail, getLoadDetail, setGetLoadDetail };
};

export default useGetDutchDetail;
