import { useState, useEffect } from "react";
import { getFriendsCategoryList } from "../services/apiService";
import { FriendType } from "../types/DataType";

const useFriendsCategoryList = (studentId: Number) => {
  const [categoryData, setCategoryData] = useState<
    {
      categoryId: number;
      students: Array<FriendType>;
      category: string;
      student: null;
    }[]
  >([]);

  const fetchFriendsCategoryList = async () => {
    try {
      const response = await getFriendsCategoryList(studentId);

      setCategoryData(response.data);
    } catch (error) {
      // 에러 처리
    }
  };

  useEffect(() => {
    fetchFriendsCategoryList();
  }, [studentId]);

  return { categoryData, setCategoryData, fetchFriendsCategoryList };
};

export default useFriendsCategoryList;
