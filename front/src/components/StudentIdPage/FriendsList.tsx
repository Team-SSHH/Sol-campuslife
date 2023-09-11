import React, { useState, useEffect } from "react";
import FriendId from "./FriendId";
import "./FriendsList.css";
import { useRecoilState } from "recoil";
import { loginuser } from "../../stores/atoms";
import { isRemittanceModalOpen } from "../../stores/atoms";
import RemittanceModal from "./RemittanceModal";
import axios from "axios";
import api1 from "../../utils/api1";
import { FriendType } from "../../types/DataType";

type DataType = {
  categoryId: number;
  category: string;
  studentId: number;
  friend: FriendType; // 이 부분은 실제 'friend' 객체의 타입으로 교체해야 합니다.
  fid: number;
};

const FriendsList = () => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [friendsData, setFriendsData] = useState<Array<FriendType>>([]);
  const [categoryData, setCategoryData] = useState<
    { categoryId: string; student: FriendType; category: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);

  useEffect(() => {
    getFriendList();
    getCategoryList();
  }, []);

  // const getFriendList = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.solcampuslife.store/sshh/friends/${userData.studentId}`
  //     );
  //     if (response.status === 200) {
  //       setFriendsData(response.data);
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };
  const getFriendList = async () => {
    try {
      const response = await api1.get(`/sshh/friends/${userData.studentId}`);
      if (response.status === 200) {
        const extractFriends = (data: DataType[]): FriendType[] => {
          return data.map((item) => item.friend);
        };

        const new_frineds: Array<FriendType> = extractFriends(response.data);
        setFriendsData(new_frineds);
        console.log(response.data);
      }
    } catch (error) {
      // 에러 처리
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await api1.get(`/sshh/category/${userData.studentId}`);
      if (response.status === 200) {
        console.log("카테고리", response.data);
        setCategoryData(response.data);
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
  const seeFrineds = (friends: FriendType) => {
    console.log(friends);
    // setFriendsData(friends);
  };

  return (
    <div>
      {!isModalOpen && (
        <div className="frinedsInfo">
          <div className="friendsCategorySet">
            <div className="friendsCategory" onClick={() => getFriendList()}>
              전체보기
            </div>
            {categoryData.map((c) => (
              <div
                className="friendsCategory"
                onClick={() => seeFrineds(c.student)}
              >
                {c.category}
              </div>
            ))}
            {/* 
            <div className="friendsCategory">전체보기</div>
            <div className="friendsCategory">그룹 1</div>
            <div className="friendsCategory">그룹 2</div>
            <div className="friendsCategory">그룹 3</div> */}
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
