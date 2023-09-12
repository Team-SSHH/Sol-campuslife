import React, { useEffect } from "react";
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
  useEffect(() => {
    const modalElement = document.querySelector(".favortieModalContainer");
    if (modalElement) {
      setTimeout(() => {
        modalElement.classList.add("show");
      }, 0);
    }
  }, []);

  return (
    <div className="favortieModalContainer">
      <div className="favoriteModalLine"></div>
      <div className="favoriteModalTitle">
        {userData.university} 학생들이 자주 가는
      </div>
      <div className="favoritePlacesContainer">
        {props.places.map((place, index) => (
          <FavoritePlace key={index} place={place} />
        ))}
      </div>
    </div>
  );
};

export default FavortieModal;
