import React, { useState } from "react";
import api1 from "../utils/api1";

const useSendOneWon = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [studentId, setStudentId] = useState("");

  const handleSendOneWon = async (studentId: Number) => {
    try {
      const response = await api1.put(`/sshh/remittance/${studentId}/won1`);
      console.log(response);

      if (response.status === 200) {
        console.log("success");
        setIsSuccess(!isSuccess);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isSuccess, handleSendOneWon, studentId, setStudentId };
};

export default useSendOneWon;
