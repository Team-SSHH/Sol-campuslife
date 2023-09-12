import React, { useState } from "react";
import { putSendOneWon } from "../services/apiService";

const useSendOneWon = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState<string>();
  const handleSendOneWon = async (studentId: Number) => {
    console.log("여깅ㅂ니더");
    console.log(studentId);
    try {
      const response = await axios.put(
        `https://api.solcampuslife.store/sshh/remittance/${studentId}/won1`
      );
      // const response = await api1.put(`/sshh/remittance/${studentId}/won1`, {
      //   content: "비밀번호486",
      // });

      if (response.status === 200) {
        console.log("success");
        setPassword(response.data.content.split(" : ")[1]);
        console.log("여길봐");
        console.log(typeof password);

        setIsSuccess(!isSuccess);
      }

    } catch (error) {
      console.error(error);
    }
  };
  return { isSuccess, handleSendOneWon, password };
};

export default useSendOneWon;
