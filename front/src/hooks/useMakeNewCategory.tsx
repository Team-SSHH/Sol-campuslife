import React, { useState } from "react";
import { postAddCategory } from "../services/apiService";

const useMakeNewCategory = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleMakeNewCategory = async (
    studentId: number,
    categoryName: string
  ) => {
    try {
      const response = await postAddCategory(studentId, categoryName);
      setIsSuccess(!isSuccess);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleMakeNewCategory, isSuccess };
};

export default useMakeNewCategory;
