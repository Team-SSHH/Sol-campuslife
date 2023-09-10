import React, { useState, useEffect } from "react";
import FriendId from "./FriendId";
import "./FriendsList.css";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import { isRemittanceModalOpen } from "../../stores/atoms";
import RemittanceModal from "./RemittanceModal";
import axios from "axios";

const FriendsList = () => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [friendsData, setFriendsData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);

  useEffect(() => {
    getFriendList();
  }, []);

  const getFriendList = async () => {
    try {
      const response = await axios.get(
        `https://api.solcampuslife.store/sshh/friends/${userData.studentId}`
      );
      if (response.status === 200) {
        setFriendsData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      // 에러 처리
    }
  };

  // const addCategory = async () => {
  //   try {
  //     const response = await api.post(`/api2/sshh/category/${loginuser.student_id}`, {categoryName});
  //     if (response.status === 200) {
  //
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const changeCategoryName = async () => {
  //   try {
  //     const response = await api.put(`/api2/sshh/category/${loginuser.student_id}`, {categoryId, categoryName});
  //     if (response.status === 200) {
  //
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  // const deleteCategory = async () => {
  //   try {
  //     const response = await api.delete(`/api2/sshh/category/${loginuser.student_id}`, {categoryId});
  //     if (response.status === 200) {
  //
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

  return (
    <div>
      {!isModalOpen && (
        <div className="frinedsInfo">
          <div className="friendsCategorySet">
            {/* 나중에 포문 돌려서 넣기 */}
            <div className="friendsCategory">전체보기</div>
            <div className="friendsCategory">그룹 1</div>
            <div className="friendsCategory">그룹 2</div>
            <div className="friendsCategory">그룹 3</div>
            {/* <div className="friendsCategory">그룹 4</div> */}
          </div>
          <div className="friendsList">
            {friendsData.map((friend, index) => (
              <FriendId key={index} id={index} friendData={friend} />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && <RemittanceModal />}
    </div>
  );
};

export default FriendsList;
