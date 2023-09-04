import React from "react";
import "./StudentId.css";
import sanghoon from "../../assets/sanghoon.png";
const StudentId = () => {
  return (
    <div>
      <div className="studentIdWrapper">
        <div className="studentInfo">
          <div>이상훈 얼굴</div>
          <img src={sanghoon} alt="sang" style={{ width: "100px" }} />
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
    </div>
  );
};

export default StudentId;
