import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectFriend,
  checkFriend,
  isRemittanceModalOpen,
  selectedFriend,
} from "../../stores/atoms";
import noncheckImg from "../../assets/noncheck.png";
import checkImg from "../../assets/check.png";
import SmartId from "../common/SmartId";
import { FriendType } from "../../types/DataType";
interface FriendIdComponentProps {
  idx: number;
  friend: number;
}

const StyledButton = styled.button`
  position: absolute;
  bottom: 6%;
  right: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  // font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 1.6rem;
  width: 5rem;
  font-size: 0.8rem;
  background: #6e96ff;
`;

const FriendIdComponent = styled.div<FriendIdComponentProps>`
  width: 96%;
  height: 36%;
  background-color: #fff;
  position: absolute;
  left: 2%;
  border-radius: 20px;
  border: solid 0.1rem;
  top: ${(props) =>
    props.idx > props.friend ? 34 + props.idx * 7 : props.idx * 7 + 2}%;
`;
interface FriendIdProps {
  // friendData: {
  //   category: string;
  //   fid: number;
  //   categoryId: number;
  //   studentId: string;
  //   friend: FriendType;
  // };
  friendData: FriendType;
  id: number;
}

const FriendId: React.FC<FriendIdProps> = (props) => {
  const friendData = props.friendData;
  // const [friend, setFriend] = useState(100);
  const [friend, setFriend] = useRecoilState(selectFriend);
  const [checkfriend, setCheckFriend] = useRecoilState(checkFriend);

  const [check, setCheck] = useState(false);
  const [resultData, setResultData] = useState("");

  const [isCheck, setIsCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const setSelectedFriend = useSetRecoilState(selectedFriend);

  const saveFriend = () => {
    if (friend === props.id) {
      setFriend(100);
    } else {
      setFriend(props.id);
    }
  };
  const remittance = () => {
    setIsModalOpen(true);
    setSelectedFriend(friendData);
  };

  // const deleteFriend = async () => {
  //   try {
  //     const response = await api.delete(`/api2/sshh/freinds/${loginuser.student_id}/delete/${freindStudentId}`);
  //     if (response.status === 200) {
  //       setResultData(`${freindStudentId}님과 친구 삭제에 성공했습니다`)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const deleteFriend = async () => {
  //   try {
  //     const response = await api.put(`/api2/sshh/freinds/${loginuser.student_id}/update/${freindStudentId}`, {categoryName});
  //     if (response.status === 200) {
  //       setResultData(`${freindStudentId}님의 카테고리 변경 완료`)
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return (
    <FriendIdComponent
      idx={props.id}
      friend={friend}
      onClick={() => saveFriend()}
    >
      <div>
        <SmartId
          name={friendData.name}
          major={friendData.major}
          studentId={friendData.studentId}
          grade={friendData.grade}
          imageUrl={friendData.imageUrl}
        />
        <span
          className="checkBox"
          onClick={(e) => {
            e.stopPropagation();
            setIsCheck(!isCheck);

            if (isCheck) {
              setCheckFriend(checkfriend.filter((f) => f !== props.id));
            } else {
              setCheckFriend([...checkfriend, props.id]);
            }
          }}
        >
          {isCheck ? (
            <img src={checkImg} style={{ width: "20px" }} />
          ) : (
            <img src={noncheckImg} style={{ width: "20px" }} />
          )}
        </span>
      </div>
      {/* 클릭하면 삭제, 카데고리 옮기기 등 옵션 보여주기 */}

      <div>
        {friend === props.id ? (
          <StyledButton
            onClick={(e) => {
              e.stopPropagation();
              remittance();
            }}
          >
            송금하기
          </StyledButton>
        ) : (
          ""
        )}
      </div>
    </FriendIdComponent>
  );
};

export default FriendId;
