import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectFriend,
  checkFriend,
  isRemittanceModalOpen,
  selectedFriend,
  friendCategory,
  isCategoryModalOpen,
} from "../../stores/atoms";
import noncheckImg from "../../assets/noncheck.png";
import checkImg from "../../assets/check.png";
import SmartId from "../common/SmartId";
import { FriendType } from "../../types/DataType";
import { loginuser } from "../../stores/atoms";

interface FriendIdComponentProps {
  idx: number;
  friend: number;
}

interface StyledButtonProps {
  right: number;
  width: number;
}
const StyledButton = styled.button<StyledButtonProps>`
  position: absolute;
  bottom: 6%;
  right: ${(props) => props.right}%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 1.6rem;
  width: ${(props) => props.width}%;
  font-size: 0.8rem;
  background: #6e96ff;
`;

const FriendIdComponent = styled.div<FriendIdComponentProps>`
  width: 96%;
  height: 40%;
  background-color: #fff;
  position: absolute;
  left: 2%;
  border-radius: 20px;
  border: solid 0.1rem;
  top: ${(props) =>
    props.idx > props.friend ? 38 + props.idx * 7 : props.idx * 7 + 2}%;
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
  const [userData, setUserData] = useRecoilState(loginuser);

  const [isCheck, setIsCheck] = useState(false);
  // 송금모달
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const setSelectedFriend = useSetRecoilState(selectedFriend);

  const [newFriendCategory, setNewFriendCategory] =
    useRecoilState(friendCategory);

  const [categoryModalOpen, setCategoryModalOpen] =
    useRecoilState(isCategoryModalOpen);

  const saveFriend = () => {
    if (friend === props.id) {
      setFriend(100);
    } else {
      setFriend(props.id);
    }
  };
  const remittance = () => {
    setIsModalOpen(true);
    setSelectedFriend([friendData]);
  };

  const moveCategory = () => {
    console.log(newFriendCategory);
    setCategoryModalOpen(newFriendCategory);
    console.log(categoryModalOpen);
  };

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
              setCheckFriend(checkfriend.filter((f) => f !== props.friendData));
            } else {
              setCheckFriend([...checkfriend, props.friendData]);
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
          <>
            <StyledButton
              right={5}
              width={24}
              onClick={(e) => {
                e.stopPropagation();
                remittance();
              }}
            >
              송금하기
            </StyledButton>
            <StyledButton
              right={30}
              width={32}
              onClick={(e) => {
                e.stopPropagation();
                moveCategory();
                // openModal();
              }}
            >
              카테고리변경
            </StyledButton>
          </>
        ) : (
          ""
        )}
      </div>
    </FriendIdComponent>
  );
};

export default FriendId;
