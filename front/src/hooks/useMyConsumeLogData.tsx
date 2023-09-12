import { useState, useEffect } from "react";
<<<<<<< HEAD
import { TransactionHistoryType, ConsumeSummaryType } from "../types/DataType";
=======
import api1 from "../utils/api1";

import { TransactionHistoryType, ConsumeSummary } from "../types/DataType";

>>>>>>> Feat_studentId
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
<<<<<<< HEAD
  const [ConsumeSummary, setConsumeSummary] = useState<ConsumeSummaryType[]>(
    []
  );
=======

  const [ConsumeSummary, setConsumeSummary] = useState<ConsumeSummary[]>([]);
>>>>>>> Feat_studentId
  const UserData = useRecoilValue(loginuser);
  const StudentId = UserData.studentId;

  useEffect(() => {
    const fetchMyConsumeData = async () => {
      try {
<<<<<<< HEAD
        const response = await getMyConsumeData(StudentId);
        const response1 = await getMyConsumeDataSummary(StudentId);
=======
        const response = await api1.get(`/sshh/history/${StudentId}`);

        const response1 = await api1.get(`/sshh/history/${StudentId}/summary`);
>>>>>>> Feat_studentId
        setMyDataConsumeLog(response.data);
        setConsumeSummary(response1.data);

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

    ConsumeSummary,

  };
};

export default useMyConsumeLogData;
