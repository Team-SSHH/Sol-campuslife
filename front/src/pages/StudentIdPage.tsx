import React, { useEffect } from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import FriendsList from "../components/StudentIdPage/FriendsList";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { checkFriend } from "../stores/atoms";
import { Console } from "console";

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
`;

const StudentIdPage = () => {
  const [checkfriend, setCheckFriend] = useRecoilState(checkFriend);
  useEffect(() => {
    return () => {
      setCheckFriend([]);
    };
  }, []);
  console.log(checkfriend);

  const dutchpay = () => {
    // 라우
  };
  const moveCategory = () => {
    // 카테고리 이동 api
  };

  return (
    <div>
      <StudentId />
      <FriendsList />
      {checkfriend &&
        (() => {
          if (checkfriend.length > 1) {
            return (
              <CircleButton onClick={() => dutchpay()}>더치페이</CircleButton>
            );
          } else if (checkfriend.length === 1) {
            return (
              <CircleButton onClick={() => moveCategory()}>
                카테고리 이동
              </CircleButton>
            );
          }
        })()}
    </div>
  );
};

export default StudentIdPage;
