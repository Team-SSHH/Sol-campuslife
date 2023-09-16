import { useState, useEffect } from "react";
import { getFriendsCategoryList } from "../services/apiService";
import { FriendType } from "../types/DataType";
import { friendCategory } from "../stores/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

interface DataType {
  categoryId: number;
  students: Array<FriendType>;
  category: string;
  student: null;
}
const useFriendsCategoryList = (studentId: Number) => {
  const [categoryData, setCategoryData] = useState<Array<DataType>>([]);
  const [totalCategory, setTotalCategory] = useRecoilState(friendCategory);

  const fetchFriendsCategoryList = async () => {
    try {
      const response = await getFriendsCategoryList(studentId);

      setCategoryData(response.data);

      // const extractFriends = (data: DataType[]): object[] => {
      //   return data.map((item) => ({ [item.categoryId]: item.category }));
      // };
      // const new_category: object[] = extractFriends(response.data);

      // 카테고리 종류별로 모아두기
      // 카테고리 종류별로 모아두기
      const extractCategories = (
        data: DataType[]
      ): { categoryId: number; category: string }[] => {
        return data.map((item) => ({
          categoryId: item.categoryId,
          category: item.category,
        }));
      };

      const new_category = extractCategories(response.data);

      setTotalCategory(new_category);
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
