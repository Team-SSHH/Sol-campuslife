import React from "react";

interface SquareBoxProps {
  color: string;
  text: string;
  src: string;
  width: string;
  height: string;
}

const titleStyle: React.CSSProperties = {
  position: "relative",
  left: "5%",
};

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
    fontWeight: "bold",
    fontSize: "1.1rem",
  };

  const imgStyle: React.CSSProperties = {
    width: "50px",
    height: "auto",
    position: "relative",
    left: "5%",
    top: "10%",
  };

  return (
    <div style={boxStyle}>
      <img src={src} alt="" style={imgStyle} />
      <p style={titleStyle}>{text}</p>
    </div>
  );
};

export default SquareBox;
