import { useState, useEffect } from "react";
import { TransactionHistoryType } from "../types/DataType";
import { getAllConsumeData } from "../services/apiService";

const useAllConsumeData = () => {
  const [AllDataConsumeLog, setAllDataConsumeLog] = useState<
    TransactionHistoryType[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllConsumeData();
        setAllDataConsumeLog(response.data);
      } catch (error) {
        // 에러 처리 부분 추가 필요.
        console.error(error);
      }
    };
    fetchData();
  }, []);

  ///////////// 평균구하기
  // 카테고리별로 합이 나옵니다.
  const categoryCounts: { [key: string]: number } = {}; // 카테고리별 학생 수를 저장할 객체
  const categoryStudentCounts: { [key: string]: Set<number> } = {}; // 카테고리별 학생 ID 집합을 저장할 객체

  const AllcategorySum = AllDataConsumeLog.reduce<{ [key: string]: number }>(
    (acc, cur) => {
      if (!acc[cur.contentCategory]) {
        acc[cur.contentCategory] = cur.pay;
        categoryCounts[cur.contentCategory] = 1; // 새로운 카테고리가 등장하면 학생 수를 1로 초기화
        categoryStudentCounts[cur.contentCategory] = new Set([cur.studentId]); // 새로운 카테고리에 학생 ID 추가
      } else {
        acc[cur.contentCategory] += cur.pay;
        if (!categoryStudentCounts[cur.contentCategory].has(cur.studentId)) {
          categoryStudentCounts[cur.contentCategory].add(cur.studentId); // 기존 카테고리에 새로운 학생 ID 추가
          categoryCounts[cur.contentCategory]++; // 기존 카테고리면 학생 수 증가
        }
      }

      return acc;
    },
    {}
  );
  console.log(categoryStudentCounts);
  console.log("dddddddddddddcategoryStudentCounts");
  const categoryAverages: { [key: string]: number } = {};

  // 각 카테고리의 평균 값 계산
  for (const category in AllcategorySum) {
    const totalPay = AllcategorySum[category]; // 해당 카테고리의 전체 지출 금액
    const totalCount = categoryCounts[category]; // 해당 카테고리의 전체 학생 수

    const average = totalCount > 0 ? totalPay / totalCount : 0; // 평균 계산

    categoryAverages[category] = average; // 평균 값을 할당
  }
  ///////////////

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
    let filteredAndSortedData: {
      content: string;
      imgUrl: string;
      userScore: string;
      address: string;
    }[] = [];

    AllDataConsumeLog.forEach((data) => {
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
      if (dayMatched && categoryMatched && timeMatched && data.imgUrl) {
        const existingPlace = filteredAndSortedData.find(
          (item) => item.address === data.address
        );

        if (!existingPlace) {
          filteredAndSortedData.push({
            content: data.content,
            imgUrl: data.imgUrl,
            userScore: data.userScore,
            address: data.address,
          });
        }
        frequencyCount[data.content]
          ? frequencyCount[data.content]++
          : (frequencyCount[data.content] = 1);
      }
    });

    filteredAndSortedData.sort(
      (a, b) => frequencyCount[b.content] - frequencyCount[a.content]
    );
    console.log(filteredAndSortedData);
    return filteredAndSortedData;
  };

  return {
    AllDataConsumeLog,
    AllcategorySum,
    categoryAverages,
    getContentWithImgSortedByFrequency,
  };
};

export default useAllConsumeData;
