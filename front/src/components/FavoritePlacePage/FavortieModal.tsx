import React, { useEffect, useState } from "react";
import "./FavoriteModal.css";
import FavoritePlace from "./FavoritePlace";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import { placeType } from "../../types/DataType";

interface FavortieModalProps {
  places: Array<placeType>;
}

const FavortieModal: React.FC<FavortieModalProps> = (props) => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const modalElement = document.querySelector(".favortieModalContainer");
    if (modalElement) {
      setTimeout(() => {
        modalElement.classList.add("show");
      }, 0);
    }
  }, []);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <div
      className={`favortieModalContainer ${
        isFullScreen ? "fullScreen" : "favortieModalContainerMiddle"
      }`}
    >
      <div className="favoriteModalLine" onClick={toggleFullScreen}></div>
      <div className="favoriteModalTitle">
        {userData.university} 학생들이 자주 가는
      </div>
      <div className="favoritePlacesContainer">
        {props.places.map((place, index) => (
          <FavoritePlace key={index} place={place} />
        ))}
      </div>
      {isFullScreen ? (
        <div
          style={{ position: "absolute", right: "5%" }}
          className="favoriteModalMore"
          // onClick={} // 다음페이지 만들고 이동시키기
        >
          {/* 더보기 &gt;&gt; */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FavortieModal;
