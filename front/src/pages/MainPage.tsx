import React from "react";
import StudentId from "../components/StudentIdPage/StudentId";
import SquareBox from "../components/MainPage/SquareBox";
import "./styles/MainPage.css";
import wallet from "../assets/wallet.png";
import dollar from "../assets/dollar.png";
import dashboard from "../assets/dashboard.png";
import place from "../assets/place.png";
import click from "../assets/click.png";

import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <StudentId />
      <div className="box1" onClick={() => navigate("/StudentId")}>
        <SquareBox
          color="#C7D6FF"
          text="ID 월렛"
          src={wallet}
          width="200px"
          height="155px"
        />
      </div>
      <div className="box2" onClick={() => navigate("/Fxrate")}>
        <SquareBox
          color="#FFF7AC"
          text="환전 신청"
          src={dollar}
          width="140px"
          height="155px"
        />
      </div>
      <div className="box3" onClick={() => navigate("/ConsumeLog")}>
        <SquareBox
          color="#FFCBF4"
          text="소비 로그"
          src={dashboard}
          width="160px"
          height="155px"
        />
      </div>
      <div className="box4" onClick={() => navigate("/FavoritePlace")}>
        <SquareBox
          color="#B7FF95"
          text="건국대생이 자주 가는"
          src={place}
          width="180px"
          height="155px"
        />
      </div>
      <div className="box5" onClick={() => navigate("/BankLocation")}>
        <SquareBox
          color="#B9A3F9"
          text="가까운 영업점"
          src={click}
          width="195px"
          height="165px"
        />
      </div>
    </div>
  );
};

export default MainPage;
