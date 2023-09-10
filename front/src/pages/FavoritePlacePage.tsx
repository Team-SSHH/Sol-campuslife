import React from "react";
import "./styles/FavoritePlacePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import qwe from "../assets/qwe.png";
import styled from "styled-components";
import Carousel from "../components/FavoritePlacePage/Carousel";

const StyledButton = styled.button`
  position: absolute;
  top: 33%;
  left: 40%;
  // outline: none;
  border: none;
  border-radius: 15px;
  // color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 2.4rem;
  width: 20%;
  font-size: 1rem;
  background: #c6d5ff;
`;

const tag1 = ["월", "화", "수", "목", "금", "토", "일"];

const tag2 = ["맛집", "PC방", "노래방", "마트", "병원", "헬스장"];

const tag3 = ["12", "14", "16", "18", "20", "22", "24", "02"];

const FavoritePlacePage = () => {
  const getPlace = () => {
    console.log("장소를 찾아옵니다.");
  };
  return (
    <div className="favoritePlaceWrapper">
      <p className="tagText">키워드를 선택해주세요.</p>
      <div className="tagContainer">
        <Carousel tags={tag1} tagName="요일" />
        <Carousel tags={tag2} tagName="" />
        <Carousel tags={tag3} tagName="시" />
      </div>
      <StyledButton onClick={getPlace}>검색</StyledButton>
      <div className="loac-container">
        <div className="loac-con1">
          <p>건국대 학생들이 자주 간</p>
        </div>

        <div className="loac-con">
          <div className="loca-box">
            <div className="imgbox">
              <div className="img">
                <img className="imgimg" src={qwe} alt="" />
              </div>
            </div>
            <div className="contextbox">
              <div className="img">
                <p>OO 삼겹</p>
                <p>7시 맛집</p>
              </div>
            </div>
          </div>
        </div>
        <div className="loac-con">
          <div className="loca-box"></div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlacePage;
