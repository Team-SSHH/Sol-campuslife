import React, { useEffect } from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import FriendsList from "../components/StudentIdPage/FriendsList";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  checkFriend,
  isRemittanceModalOpen,
  selectedFriend,
} from "../stores/atoms";
import { putDutchPay } from "../services/apiService";
import { loginuser } from "../stores/atoms";
import { FriendType } from "../types/DataType";

const CircleButton = styled.div`
  position: fixed;
  bottom: 10%;
  right: 5%;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  background-color: #6f96ff;
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.6rem;
`;

const StudentIdPage = () => {
  const [checkfriend, setCheckFriend] =
    useRecoilState<Array<FriendType>>(checkFriend);
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const setSelectedFriend = useSetRecoilState(selectedFriend);

  useEffect(() => {
    return () => {
      setCheckFriend([]);
    };
  }, []);

  const dutchpay = () => {
    setIsModalOpen(true);
    setSelectedFriend(checkfriend);
    setCheckFriend([]);
  };

  return (
    <div>
      <StudentId />
      <FriendsList />
      {checkfriend.length > 1 && (
        <CircleButton onClick={() => dutchpay()}>더치페이</CircleButton>
      )}
    </div>
  );
};

export default StudentIdPage;
