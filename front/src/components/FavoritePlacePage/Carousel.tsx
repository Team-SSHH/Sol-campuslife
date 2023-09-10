import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

interface CarouselBtnProps {
  $isclicked: boolean;
}

const StyledButton = styled.button<CarouselBtnProps>`
  margin-right: 5%;
  border-radius: 20px;
  background-color: ${(props) => (props.$isclicked ? "#6f96ff" : "#fff")};
  color: ${(props) => (props.$isclicked ? "#fff" : "#000000")};
  font-weight: ${(props) => (props.$isclicked ? "bold" : "")};
  height: 2.2rem;
  width: 5rem;
  border: none;
`;

interface CarouselButtonProps {
  tag: string | number;
  tagName: string;
}

const CarouselButton = ({ tag, tagName }: CarouselButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <StyledButton $isclicked={isClicked} onClick={handleClick}>
      {tag}
      {tagName}
    </StyledButton>
  );
};

interface CarouselProps {
  tags: Array<string | number>;
  tagName: string;
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
};

const Carousel = ({ tags, tagName }: CarouselProps) => {
  return (
    <div className="tagCon">
      <div className="tagBox">
        <Slider {...settings}>
          {tags.map((tag, index) => (
            <CarouselButton key={index} tag={tag} tagName={tagName} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
