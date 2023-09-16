import React, { useEffect, useState } from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import MessageBox from "../components/RegisterFriendPage/MessageBox";
import useSendOneWon from "../hooks/useSendOneWon";
// import useFriendPush from "../hooks/useFriendPush";
import useMakeFriend from "../hooks/useMakeFriend";
import useFriendListData from "../hooks/useFriendListData";
import { useRecoilValue } from "recoil";
import { loginuser } from "../stores/atoms";
import { useNavigate } from "react-router-dom";
import useGPSLocation from "../hooks/useGPSLocation";
import usePostGPS from "../hooks/usePostGPS";

interface PageProps {
  text: string;
  height: number;
  onConfirm: (value: string) => void;
}

const RegisterFriendPage = () => {
  const [step, setStep] = useState(0);
  const [inputID, setInputID] = useState("");

  const userData = useRecoilValue(loginuser);

  const navigate = useNavigate();

  const { isSuccess, password, handleSendOneWon } = useSendOneWon();
  // const { handleSendAlarm } = useFriendPush();
  const { handleMakeFriend } = useMakeFriend();
  const { handlePutMyLocation } = usePostGPS();
  const { MyfriendStudentIds, fetchFriendList } = useFriendListData(
    userData.studentId
  );
  const MyLocation = useGPSLocation();

  console.log("내내내내정보", MyLocation);

  const registerFriend = (value: string) => {
    if (value === password) {
      handleMakeFriend(userData.studentId, Number(inputID));
      fetchFriendList();
      alert("학생증 등록이 완료되었습니다.");
      navigate("/main");
    }
  };

  const send = () => {
    handlePutMyLocation(userData.studentId);
  };

  const pages: PageProps[] = [
    {
      text: "추가할 친구의 학번을 입력해주세요",
      height: 30,
      onConfirm: async (value) => {
        setInputID(value);
        console.log(MyfriendStudentIds);
        if (MyfriendStudentIds.includes(Number(value))) {
          alert("이미 친구입니다.");
        } else if (Number(value) === userData.studentId) {
          alert("본인 학번입니다. 다시 입력해주세요.");
        } else {
          const isSuccessful = await handleSendOneWon(Number(value));
          if (isSuccessful) {
            // handleSendAlarm(userData.studentId, Number(value));
            setStep((prevStep) => prevStep + 1);
          } else {
            alert("없는 유저입니다.");
          }
        }
      },
    },
    {
      text: "친구에게 전송된 인증번호를 알려주세요",
      height: 40,
      onConfirm: (value) => {
        registerFriend(value);
      },
    },
  ];

  return (
    <div>
      <StudentId />
      <MessageBox
        key={step}
        height={pages[step].height}
        text={pages[step].text}
        onConfirm={pages[step].onConfirm}
        // onConfirm={() => setStep(step + 1)}
      />
    </div>
  );
};

export default RegisterFriendPage;
