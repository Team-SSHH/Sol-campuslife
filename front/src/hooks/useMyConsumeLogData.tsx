import { useState, useEffect } from "react";
import { TransactionHistoryType, ConsumeSummaryType } from "../types/DataType";
import { useRecoilValue } from "recoil";
import { loginuser } from "../stores/atoms";
import {
  getMyConsumeData,
  getMyConsumeDataSummary,
} from "../services/apiService";

const useMyConsumeLogData = () => {
  const [MyDataConsumeLog, setMyDataConsumeLog] = useState<
    TransactionHistoryType[]
  >([]);
  const [ConsumeSummary, setConsumeSummary] = useState<ConsumeSummaryType[]>(
    []
  );
  const UserData = useRecoilValue(loginuser);
  const StudentId = UserData.studentId;

  useEffect(() => {
    const fetchMyConsumeData = async () => {
      try {
        const response = await getMyConsumeData(StudentId);
        const response1 = await getMyConsumeDataSummary(StudentId);
        setMyDataConsumeLog(response.data);
        setConsumeSummary(response1.data);
        console.log(response1.data);
        console.log("response1.dataresponse1.dataresponse1.data");
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

  // 날짜별 소비 내역 정리
  const dateWiseConsumption = MyDataConsumeLog.reduce<{
    [key: string]: { [key: string]: number };
  }>((acc, cur) => {
    if (cur.pay > 0) {
      // pay가 0보다 큰 경우만 처리
      const date = cur.transactionTime.split(" ")[0]; // YYYY-MM-DD 형태의 날짜 추출
      if (!acc[date]) {
        acc[date] = { [cur.content]: cur.pay };
      } else {
        if (!acc[date][cur.content]) {
          acc[date][cur.content] = cur.pay;
        } else {
          acc[date][cur.content] += cur.pay;
        }
      }
    }

    return acc;
  }, {});

  // console.log(MyDataConsumeLog);

  return {
    MyDataConsumeLog,
    MycategorySum,
    dateWiseConsumption,
    ConsumeSummary,
  };
};

export default useMyConsumeLogData;
