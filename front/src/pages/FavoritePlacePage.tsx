import React, { useState } from "react";
import "./styles/FavoritePlacePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Carousel from "../components/FavoritePlacePage/Carousel";
import useAllConsumeLogData from "../hooks/useAllConsumeLogData";

import { useRecoilState } from "recoil";
import { loginuser } from "../stores/atoms";
import FavortieModal from "../components/FavoritePlacePage/FavortieModal";
import { placeType } from "../types/DataType";

const StyledButton = styled.button`
  position: relative;
  top: 10%;
  left: 40%;
  // outline: none;
  border: none;
  border-radius: 15px;
  // color: white;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;

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
  const [modalVisible, setModalVisible] = useState(false);
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const { getContentWithImgSortedByFrequency } = useAllConsumeLogData();

  const getPlace = () => {
    setPlaces(getContentWithImgSortedByFrequency(selectedTags));
    setModalVisible(true);
  };

  return (
    <div className="favoritePlaceWrapper">
      <h3 className="tagText">키워드를 선택해주세요.</h3>
      <div className="tagContainer">
        <Carousel tags={tag1} tagName="요일" onTagClick={handleTagClick} />
        <Carousel tags={tag2} tagName="" onTagClick={handleTagClick} />
        <Carousel tags={tag3} tagName="시" onTagClick={handleTagClick} />
      </div>
      <StyledButton onClick={getPlace}>검색</StyledButton>

      {modalVisible && <FavortieModal places={places} />}
    </div>
  );
};

export default FavoritePlacePage;
