import React from "react";
import "./styles/FavoritePlacePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import qwe from "../assets/qwe.png";

const tag1 = ["월", "화", "수", "목", "금", "토", "일"];

const tag2 = ["맛집", "PC방", "노래방", "마트", "병원", "헬스장"];

const tag3 = ["12", "14", "16", "18", "20", "22", "24", "02"];

const FavoritePlacePage = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };
  const settings2 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  const settings3 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="place-con">
      <div className="tag-container">
        <div className="tag-con">
          <div className="tag-box">
            <Slider {...settings}>
              {tag1.map((day, index) => (
                <button className="tag-btn" key={index}>
                  {day}요일
                </button>
              ))}
            </Slider>
          </div>
        </div>
        <div className="tag-con">
          <div className="tag-box">
            <Slider {...settings2}>
              {tag2.map((cate, index) => (
                <button className="tag-btn" key={index}>
                  {cate}
                </button>
              ))}
            </Slider>
          </div>
        </div>

        <div className="tag-con">
          <div className="tag-box">
            <Slider {...settings3}>
              {tag3.map((time, index) => (
                <button className="tag-btn" key={index}>
                  {time}시
                </button>
              ))}
            </Slider>
          </div>
        </div>
      </div>
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
