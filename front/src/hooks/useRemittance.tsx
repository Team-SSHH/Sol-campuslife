import React, { useState } from "react";
import { putRemittance } from "../services/apiService";

const useRemittance = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const handleRemittance = async (
    studentId: Number,
    friendId: Number,
    amount: Number,
    content: String
  ) => {
    try {
      const responose = await putRemittance(
        studentId,
        friendId,
        amount,
        content
      );
      setIsSuccess(!isSuccess);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { handleRemittance, isSuccess };
};

export default useRemittance;
