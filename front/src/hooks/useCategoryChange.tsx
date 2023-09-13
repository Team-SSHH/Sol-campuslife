import React, { useState } from "react";
import { putFriendCategory } from "../services/apiService";

const useCategoryChange = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangeCategory = async (
    studentId: Number,
    friendId: Number,
    categoryId: Number
  ) => {
    try {
      const response = await putFriendCategory(studentId, friendId, categoryId);
      setIsSuccess(!isSuccess);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return { handleChangeCategory };
};

export default useCategoryChange;
