import React, { useState, useEffect } from "react";
import FriendId from "./FriendId";
import "./FriendsList.css";
import { useRecoilState } from "recoil";
import { friendCategory, loginuser } from "../../stores/atoms";
import { isRemittanceModalOpen, isCategoryModalOpen } from "../../stores/atoms";
import RemittanceModal from "./RemittanceModal";
import { FriendType } from "../../types/DataType";
import useFriendListData from "../../hooks/useFriendListData";
import useFriendsCategoryList from "../../hooks/useFriendsCategoryList";
import BasicBox from "./BasicBox";

const FriendsList = () => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const { friendsData, fetchFriendList, setFriendsData } = useFriendListData(
    userData.studentId
  );
  //혹시 나중에 fetchFriendsCategoryList, setCategoryData 쓸려나... 남겨둠
  const { categoryData, fetchFriendsCategoryList, setCategoryData } =
    useFriendsCategoryList(userData.studentId);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const [categoryModalOpen, setCategoryModalOpen] =
    useRecoilState(isCategoryModalOpen);
  const [nowCategory, setNowCategory] = useState<Number>(0);
  const [totalCategory, setTotalCategory] = useRecoilState(friendCategory);

  const seeFriends = (friends: Array<FriendType>) => {
    setFriendsData(friends);
  };

  const addCategory = () => {};

  return (
    <div>
      {!isModalOpen && (
        <div className="frinedsInfo">
          <div className="friendsCategorySet">
            <div
              className={`friendsCategory ${
                nowCategory === 0 ? "nowFriendsCategory" : ""
              }`}
              onClick={() => {
                fetchFriendList();
                setNowCategory(0);
              }}
            >
              전체보기
            </div>
            {categoryData.map((c) => (
              <div
                key={c.categoryId}
                className={`friendsCategory ${
                  nowCategory === c.categoryId ? "nowFriendsCategory" : ""
                }`}
                onClick={() => {
                  seeFriends(c.students);
                  setNowCategory(c.categoryId);
                }}
              >
                {c.category}
              </div>
            ))}
            <div className="friendsCategory" onClick={() => addCategory()}>
              추가
            </div>
          </div>
          <div className="friendsList">
            {friendsData.map((friend, index) => (
              <FriendId key={index} id={index} friendData={friend} />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && <RemittanceModal />}
      {categoryModalOpen && <BasicBox category={totalCategory} />}
    </div>
  );
};

export default FriendsList;
