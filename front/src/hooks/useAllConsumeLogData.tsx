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

  return { AllData, AllcategorySum };
};

export default useAllConsumeData;
