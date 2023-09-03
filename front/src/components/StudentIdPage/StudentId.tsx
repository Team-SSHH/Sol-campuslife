import React from "react";
import "./StudentId.css";
import FrinedId from "./FrinedId";

const StudentId = () => {
  return (
    <div>
      <div className="studentIdWrapper">
        <div className="studentInfo">
          <div>이상훈 얼굴</div>
          <div>
            <span>금속신소재공학과</span>
            <span> </span>
            <span>재학생 (2학년)</span>
          </div>
          <div>
            <span>이상훈</span>
            <span>201403808</span>
          </div>
        </div>
      </div>
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

export default StudentId;
