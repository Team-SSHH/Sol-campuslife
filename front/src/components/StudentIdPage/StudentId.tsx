import React, { useState } from "react";
import "./StudentId.css";
import sanghoon from "../../assets/sanghoon.png";

const StudentId = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`studentIdWrapper ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="front">
        <div className="studentInfo">
          {/* <div>이상훈 얼굴</div> */}
          <img src={sanghoon} alt="sang" style={{ width: "100px" }} />
          <div className="studentTextInfo">
            <span>금속신소재공학과</span>
            <span> </span>
            <span>재학생 (2학년)</span>
            <div>
              <span>이상훈 </span>
              <span>(201403808)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="back">
        <div className="cardInfo">
          <div>계좌번호: 93087254624787</div>
          <div>잔액: 500원</div>
        </div>
      </div>
    </div>
  );
};

export default StudentId;
