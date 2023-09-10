import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Carousel: React.FC<CarouselProps> = ({ tags, tagName }) => {
  return (
    <div className="tagCon">
      <div className="tagBox">
        <Slider {...settings}>
          {tags.map((tag, index) => (
            <button className="tagBtn" key={index}>
              {tag}
              {tagName}
            </button>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
