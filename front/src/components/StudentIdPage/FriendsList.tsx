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
    {
      categoryId: number;
      students: Array<FriendType>;
      category: string;
      student: null;
    }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);
  const [nowCategory, setNowCategory] = useState<Number>(0);

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
      }
    } catch (error) {
      // 에러 처리
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await api1.get(`/sshh/category/${userData.studentId}`);
      if (response.status === 200) {
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
  const seeFrineds = (friends: Array<FriendType>) => {
    setFriendsData(friends);
  };

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
                getFriendList();
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
                  seeFrineds(c.students);
                  setNowCategory(c.categoryId);
                }}
              >
                {c.category}
              </div>
            ))}
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
