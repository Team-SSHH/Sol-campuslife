import React from "react";
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
