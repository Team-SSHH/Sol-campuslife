import React from "react";
import styled from "styled-components";

const FriendIdComponent = styled.div`
  width: 96%;
  height: 30%;
  background-color: #fff;
  position: relative;
  left: 2%;
  top: 7%;
  border-radius: 20px;
`;
interface FriendIdProps {
  friendData: {
    name: string;
    major: string;
    number: number;
    grade: string;
  };
}
const FriendId: React.FC<FriendIdProps> = (props) => {
  const friendData = props.friendData;
  return (
    <FriendIdComponent>
      <div className="firendName">
        모바일 학생증 {friendData.name}
        {/* 클릭하면 삭제, 카데고리 옮기기 등 옵션 보여주기 */}
        <span>···</span>
      </div>
      <div>{friendData.name}의 얼굴</div>
      <div>
        <span>{friendData.major}</span>
        <span> </span>
        <span>재학생 ({friendData.grade})</span>
      </div>
      <div>
        <span>김동현</span>
        <span>201603808</span>
      </div>
    </FriendIdComponent>
  );
};

export default FriendId;
