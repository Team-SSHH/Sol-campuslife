import React from "react";
import FriendId from "./FriendId";
import "./FriendsList.css";

const FriendsList = () => {
  const friends = [
    {
      name: "상익스트라",
      major: "경영학과",
      number: 201639874,
      grade: "3학년",
    },
    {
      name: "최상익",
      major: "경영학과",
      number: 201904874,
      grade: "1학년",
    },
    {
      name: "김동동",
      major: "식품공학과",
      number: 201632084,
      grade: "2학년",
    },
    {
      name: "김동그라미",
      major: "식품공학과",
      number: 201632084,
      grade: "2학년",
    },
  ];

  return (
    <div>
      <div className="frinedsInfo">
        <div className="friendsCategorySet">
          {/* 나중에 포문 돌려서 넣기 */}
          <div className="friendsCategory">전체보기</div>
          <div className="friendsCategory">그룹 1</div>
          <div className="friendsCategory">그룹 2</div>
          <div className="friendsCategory">그룹 3</div>
          {/* <div className="friendsCategory">그룹 4</div> */}
        </div>
        <div className="friendsList">
          {friends.map((friend, index) => (
            <FriendId key={index} friendData={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
