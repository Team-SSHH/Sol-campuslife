import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  isCategoryModalOpen,
  loginuser,
  selectedFriend,
} from "../../stores/atoms";
import { FriendType } from "../../types/DataType";
import useCategoryChange from "../../hooks/useCategoryChange";

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

interface BasicBoxComponentProps {
  selected?: boolean; // 선택된 상태 여부를 나타내는 속성
}

const BasicBoxComponent = styled.div<BasicBoxComponentProps>`
  position: relative;

  height: 10%;
  // width: %;
  margin-bottom: 3%;
  outline: none;
  border: none;
  border-radius: 15px;
  color: white;

  font-size: 0.8rem;
  background: ${(props) => (props.selected ? "#6e96ff" : "#c7d6ff")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};

  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 6%;
  outline: none;
  border: none;
  border-radius: 15px;
  padding-left: 1rem;
  padding-right: 1rem;
  z-index: 1;

  height: 1.6rem;
  font-size: 0.8rem;
  background: #6e96ff;
`;
const CategoryBox = styled.div`
  overflow-y: scroll;
  width: 70%;
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
  const [clickCategoryId, setClickCategoryId] = useState<number>(0);
  const friendData = useRecoilValue<Array<FriendType>>(selectedFriend);
  const [userData, setUserData] = useRecoilState(loginuser);
  const { handleChangeCategory } = useCategoryChange();

  const isclick = (props: number) => {
    if (clickCategoryId !== props) {
      setClickCategoryId(props);
    } else {
      setClickCategoryId(0);
    }
  };

  const onConfirm = () => {
    handleChangeCategory(
      userData.studentId,
      friendData[0].studentId,
      clickCategoryId
    );
    setCategoryModalOpen(false);
    window.location.reload();
  };

  return (
    <BasicBoxWraper>
      <Ptag>카테고리를 선택해주세요</Ptag>
      <CategoryBox>
        {props.category.map(
          (c, index) =>
            c.categoryId !== friendData[0].categoryId && (
              <BasicBoxComponent
                key={index}
                selected={clickCategoryId === c.categoryId}
                onClick={() => isclick(c.categoryId)}
              >
                {c.category}
              </BasicBoxComponent>
            )
        )}
      </CategoryBox>

      <StyledButton onClick={() => onConfirm()}>선택</StyledButton>
    </BasicBoxWraper>
  );
};

export default BasicBox;
