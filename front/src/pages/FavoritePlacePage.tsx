import React, { useState } from "react";
import "./styles/FavoritePlacePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import qwe from "../assets/qwe.png";
import styled from "styled-components";
import Carousel from "../components/FavoritePlacePage/Carousel";
import useAllConsumeLogData from "../hooks/useAllConsumeLogData";
import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import FavortieModal from "../components/FavoritePlacePage/FavortieModal";
import { placeType } from "../types/DataType";

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

const tag2 = ["음식", "카페", "문화", "학습", "교통", "기타"];

const tag3 = [
  "08-10",
  "10-12",
  "12-14",
  "14-16",
  "16-18",
  "18-20",
  "20-22",
  "22-24",
  "24-02",
  "02-04",
];

const FavoritePlacePage = () => {
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [places, setPlaces] = useState<placeType[]>([]);

  const [userData, setUserData] = useRecoilState(loginuser);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const { getContentWithImgSortedByFrequency } = useAllConsumeLogData();

  const getPlace = () => {
    console.log("장소를 찾아옵니다.");
    setPlaces(getContentWithImgSortedByFrequency(selectedTags));
    console.log("선택된 태그들:", selectedTags);
    console.log("선택된 태그들:", typeof selectedTags);
    console.log(getContentWithImgSortedByFrequency(selectedTags));
  };

  return (
    <div className="favoritePlaceWrapper">
      <p className="tagText">키워드를 선택해주세요.</p>
      <div className="tagContainer">
        <Carousel tags={tag1} tagName="요일" onTagClick={handleTagClick} />
        <Carousel tags={tag2} tagName="" onTagClick={handleTagClick} />
        <Carousel tags={tag3} tagName="시" onTagClick={handleTagClick} />
      </div>
      <StyledButton onClick={getPlace}>검색</StyledButton>

      <FavortieModal places={places} />
      {/* <div className="loac-container">
        <div className="loac-con1">
          <div className="loacTitle">
            {userData.university} 학생들이 자주 간
          </div>
          <FavoritePlace />
          <FavoritePlace />
        </div>
      </div> */}
    </div>
  );
};

export default FavoritePlacePage;
