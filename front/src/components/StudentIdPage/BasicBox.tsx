import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isCategoryModalOpen } from "../../stores/atoms";

const BasicBoxWraper = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  z-index: 20;
  position: fixed;
  background-color: #fff;
  width: 60%;
  height: 40%;
  left: 20%;
  flex-direction: column;
  bottom: 15%;
  border-radius: 40px;
  border: 1px solid #000;
`;
const BasicBoxComponent = styled.div`
  position: relative;

  // top: 10%;
  // right: 20%;
  height: 10%;
  width: 60%;

  outline: none;
  border: none;
  border-radius: 15px;
  color: white;
  padding-left: 1rem;
  padding-right: 1rem;

  font-size: 0.8rem;
  background: #6e96ff;

  // text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  // justify-self: center;
  // align-items: center;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 6%;
  outline: none;
  border: none;
  border-radius: 15px;
  // color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 1.6rem;
  font-size: 1rem;
  background: #c7d6ff;
`;

const Ptag = styled.div`
  justify-self: flex-start;
  padding: 10%;
`;

interface categoryData {
  categoryId: number;
  category: string;
}

interface BasicBoxProps {
  category: Array<categoryData>;
}
const BasicBox: React.FC<BasicBoxProps> = (props) => {
  const [categoryModalOpen, setCategoryModalOpen] =
    useRecoilState(isCategoryModalOpen);
  return (
    <BasicBoxWraper>
      <Ptag>카테고리를 선택해주세요</Ptag>
      {props.category.map((c, index) => (
        <BasicBoxComponent key={index}>{c.category}</BasicBoxComponent>
      ))}
      <StyledButton>선택</StyledButton>
    </BasicBoxWraper>
  );
};

export default BasicBox;
