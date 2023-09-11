import { useState, useEffect } from "react";
import api1 from "../utils/api1";
import { TransactionHistoryType } from "../types/DataType";
import { useRecoilValue } from "recoil";
import { loginuser } from "../stores/atoms";

const useMyConsumeLogData = () => {
  const [MyDataConsumeLog, setMyDataConsumeLog] = useState<
    TransactionHistoryType[]
  >([]);
  const UserData = useRecoilValue(loginuser);
  const StudentId = UserData.studentId;
  useEffect(() => {
    const fetchMyConsumeData = async () => {
      try {
        const response = await api1.get(`/sshh/history/${StudentId}`);
        setMyDataConsumeLog(response.data);
      } catch (error) {
        // 에러 처리 부분 추가 필요.
        console.error(error);
      }
    };
    fetchMyConsumeData();
  }, []);

  // 카테고리별로 합.
  const MycategorySum = MyDataConsumeLog.reduce<{ [key: string]: number }>(
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

  return {
    MyDataConsumeLog,
    MycategorySum,
  };
};

export default useMyConsumeLogData;
