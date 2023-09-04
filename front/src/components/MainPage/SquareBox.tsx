import React from "react";

interface SquareBoxProps {
  color: string;
  text: string;
  src: string;
  width: string;
  height: string;
}

const SquareBox: React.FC<SquareBoxProps> = ({
  color,
  text,
  src,
  width,
  height,
}) => {
  const boxStyle = {
    backgroundColor: color,
    width,
    height,
    borderRadius: "20px",
  };

  const imgStyle = {
    width: "50px",
    height: "auto",
  };

  return (
    <div style={boxStyle}>
      <img src={src} alt="" style={imgStyle} />
      <p>{text}</p>
    </div>
  );
};

export default SquareBox;
