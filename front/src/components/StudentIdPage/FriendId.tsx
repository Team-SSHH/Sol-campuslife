import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectFriend,
  checkFriend,
  isRemittanceModalOpen,
  selectedFriend,
} from "../../utils/atoms";
import noncheckImg from "../../assets/noncheck.png";
import checkImg from "../../assets/check.png";

interface FriendIdComponentProps {
  idx: number;
  friend: number;
}

const StyledButton = styled.button`
  position: absolute;
  bottom: 10%;
  right: 10%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.25rem;
  width: 6rem;
  font-size: 1rem;
  background: #6e96ff;
`;

const FriendIdComponent = styled.div<FriendIdComponentProps>`
  width: 96%;
  height: 30%;
  background-color: #fff;
  position: absolute;
  left: 2%;
  border-radius: 20px;
  border: solid 0.1rem;
  top: ${(props) =>
    props.idx > props.friend ? 28 + props.idx * 7 : props.idx * 7 + 2}%;
`;
interface FriendIdProps {
  friendData: {
    name: string;
    major: string;
    number: number;
    grade: string;
  };
  id: number;
}

const FriendId: React.FC<FriendIdProps> = (props) => {
  const friendData = props.friendData;
  const [friend, setFriend] = useRecoilState(selectFriend);
  const [checkfriend, setCheckFriend] = useRecoilState(checkFriend);
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
    console.log("돈보내라");
  };

  return (
    <FriendIdComponent
      idx={props.id}
      friend={friend}
      onClick={() => saveFriend()}
    >
      <div className="firendName">
        모바일 학생증 {friendData.name}
        {/* 클릭하면 삭제, 카데고리 옮기기 등 옵션 보여주기 */}
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
      <div className="frinedInfo">
        <div>{friendData.name}의 얼굴</div>

        <div>
          <span>{friendData.major}</span>
          <span> </span>
          <span>재학생 ({friendData.grade})</span>
        </div>
        <div>
          <span>{friendData.name} </span>
          <span>{friendData.number}</span>
        </div>
      </div>

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
