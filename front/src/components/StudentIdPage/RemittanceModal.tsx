import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  isRemittanceModalOpen,
  selectedFriend,
  loginuser,
} from "../../stores/atoms";
import "./RemittanceModal.css";
import SmartId from "../common/SmartId";
import { FriendType } from "../../types/DataType";
import Envelop from "./Envelop";

interface FriendIdComponentProps {
  idx: number;
}
const FriendIdComponent = styled.div<FriendIdComponentProps>`
  width: 99%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  // left: 2%;
  border-radius: 20px;
  border: solid 0.1rem;
  top: ${(props) => props.idx * 15}%;
`;

const EnvelopData = [
  { text1: "간편송금", text2: "송금하기" },
  { text1: "더치페이", text2: "알림보내기" },
];

const RemittanceModal = () => {
  const friendData = useRecoilValue<Array<FriendType>>(selectedFriend);

  return (
    <div className="remittanceWrapper">
      <div className="remittanceFriend">
        {friendData.map((friend, index) => (
          <FriendIdComponent idx={index} key={index}>
            <SmartId
              key={index}
              name={friend.name}
              major={friend.major}
              studentId={friend.studentId}
              grade={friend.grade}
              imageUrl={friend.imageUrl}
            />
          </FriendIdComponent>
        ))}
      </div>
      <Envelop
        isdutch={friendData.length > 1 ? true : false}
        text1={
          friendData.length > 1 ? EnvelopData[1].text1 : EnvelopData[0].text1
        }
        text2={
          friendData.length > 1 ? EnvelopData[1].text2 : EnvelopData[0].text2
        }
      />
    </div>
  );
};

export default RemittanceModal;
