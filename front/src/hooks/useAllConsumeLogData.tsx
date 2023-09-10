import { useState, useEffect } from "react";
import api1 from "../utils/api1";
import { TransactionHistoryType } from "../types/DataType";

const useAllConsumeData = () => {
  const [AllData, setAllData] = useState<TransactionHistoryType[]>([]);
  useEffect(() => {
    const fetchAllConsumeData = async () => {
      try {
        const response = await api1.get("/sshh/history");
        setAllData(response.data);
      } catch (error) {
        // 에러 처리 부분 추가 필요.
        console.error(error);
      }
    };
    fetchAllConsumeData();
  }, []);

  // 카테고리별로 합이 나옵니다.
  const AllcategorySum = AllData.reduce<{ [key: string]: number }>(
    (acc, cur) => {
      if (!acc[cur.contentCategory]) {
        acc[cur.contentCategory] = cur.pay;
      } else {
        acc[cur.contentCategory] += cur.pay;
      }

      return acc;
    },
    {}
  );

  //필터링 함수//////
  //Create a new array containing only 'content' and 'imgUrl'
  const getContentWithImgSortedByFrequency = (filters: string[]) => {
    const dayFilters = filters.filter((item) =>
      ["월", "화", "수", "목", "금", "토", "일"].includes(item)
    );
    const categoryFilters = filters.filter((item) =>
      ["음식", "카페", "문화", "학습", "교통", "기타"].includes(item)
    );
    const timeFilters = filters.filter((item) => item.includes("-"));

    // Count the frequency of each content and filter data at the same time
    const frequencyCount: { [key: string]: number } = {};
    let filteredAndSortedData: { content: string; imgUrl: string }[] = [];

    AllData.forEach((data) => {
      // Check if day matches
      const dayMatched =
        dayFilters.length === 0 || dayFilters.includes(data.day);

      // Check if category matches
      const categoryMatched =
        categoryFilters.length === 0 ||
        categoryFilters.includes(data.contentCategory);

      // Check if time matches
      let timeMatched = false;
      if (timeFilters.length > 0) {
        for (let i = 0; i < timeFilters.length; i++) {
          let startHour = parseInt(timeFilters[i].split("-")[0]);
          let endHour = parseInt(timeFilters[i].split("-")[1]);
          let transactionHour = parseInt(
            data.transactionTime.split(" ")[1].split(":")[0]
          );

          if (transactionHour >= startHour && transactionHour < endHour) {
            timeMatched = true;
            break;
          }
        }
      } else {
        timeMatched = true;
      }

      if (dayMatched && categoryMatched && timeMatched) {
        filteredAndSortedData.push({
          content: data.content,
          imgUrl: data.imgUrl,
        });
        frequencyCount[data.content]
          ? frequencyCount[data.content]++
          : (frequencyCount[data.content] = 1);
      }
    });

    filteredAndSortedData.sort(
      (a, b) => frequencyCount[b.content] - frequencyCount[a.content]
    );

    return filteredAndSortedData;
  };

  return {
    AllData,
    AllcategorySum,
    getContentWithImgSortedByFrequency,
  };
};

export default useAllConsumeData;