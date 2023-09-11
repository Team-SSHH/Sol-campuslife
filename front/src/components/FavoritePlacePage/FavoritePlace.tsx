import React from "react";
import "./FavoritePlace.css";
import { placeType } from "../../types/DataType";
interface FavoritePlaceProps {
  place: placeType;
}
const FavoritePlace: React.FC<FavoritePlaceProps> = ({ place }) => {
  return (
    <div className="favoritePlaceContianer">
      <div className="favoritePlaceBox">
        <div className="favoritePlaceImgBox">
          <div className="favoritePlaceContent">
            <img className="imgimg" src={place.imgUrl} alt="" />
          </div>
        </div>
        <div className="favoritePlaceImgBoxContextBox">
          <div className="favoritePlaceContent">
            <p>{place.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlace;
