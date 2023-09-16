import React from "react";
import "./Squarebox.css";

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
    boxShadow: `-2px -2px 1px 0px ${color}, 6px 6px 9px rgba(0, 0, 0, 0.3)`,
  };

  const imgStyle: React.CSSProperties = {
    width: "50px",
    height: "auto",
    position: "relative",
    left: "5%",
    top: "10%",
  };

  return (
    <div style={boxStyle} className="square-box">
      <img src={src} alt="" style={imgStyle} />
      <p style={titleStyle}>{text}</p>
    </div>
  );
};

export default SquareBox;
