import React from "react";
import "./FavoritePlace.css";
import { placeType } from "../../types/DataType";
interface FavoritePlaceProps {
  place: placeType;
}
const FavoritePlace: React.FC<FavoritePlaceProps> = ({ place }) => {
  const searchPlace = (word: string) => {
    const googleURL = `https://www.google.com/search?q=${encodeURIComponent(
      word
    )}`;
    window.open(googleURL, "_blank");
  };
  return (
    <div className="favoritePlaceContianer">
      <div
        className="favoritePlaceBox"
        onClick={() => searchPlace(place.content)}
      >
        <div className="favoritePlaceImgBox">
          <div className="favoritePlaceContent">
            <img className="imgimg" src={place.imgUrl} alt="" />
          </div>
        </div>
        <div className="favoritePlaceImgBoxContextBox">
          <div className="favoritePlaceContent">
            <p>⭐ {place.userScore} 점</p>
            <p>{place.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlace;
