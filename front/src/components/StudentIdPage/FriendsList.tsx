import React from "react";
import FrinedId from "./FrinedId";
import "./FriendsList.css";
const FriendsList = () => {
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
        <div className="firendsList">
          {/* 카데고리별 받아서 포문으로 보여주깅 */}
          <FrinedId />
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
