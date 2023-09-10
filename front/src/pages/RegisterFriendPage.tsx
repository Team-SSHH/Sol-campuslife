import React, { useState } from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import MessageBox from "../components/RegisterFriendPage/MessageBox";
import useSendOneWon from "../hooks/useSendOneWon";

interface PageProps {
  text: string;
  height: number;
  onConfirm: (value: string) => void;
}

const RegisterFriendPage = () => {
  const [step, setStep] = useState(0);
  // const { isSuccess, handleSendOneWon, studentId, setStudentId } =
  //   useSendOneWon();

  const handleFirstStep = async (studentId: string) => {
    // await handleSendOneWon(studentId);
    console.log("첫 번째 스텝 완료");
    setStep(step + 1);
  };

  const handleSecondStep = () => {
    console.log("두 번째 스텝 완료");
    setStep(step + 1);
  };

  const pages: PageProps[] = [
    {
      text: "추가할 친구의 학번을 입력해주세요",
      height: 30,
      onConfirm: handleFirstStep,
    },
    {
      text: "친구에게 전송된 입금자명을 알려주세요",
      height: 40,
      onConfirm: handleSecondStep,
    },
  ];

  return (
    <div>
      <StudentId />
      <MessageBox
        height={pages[step].height}
        text={pages[step].text}
        onConfirm={pages[step].onConfirm}
        // onConfirm={() => setStep(step + 1)}
      />
    </div>
  );
};

export default RegisterFriendPage;
