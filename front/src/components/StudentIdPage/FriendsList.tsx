import React, { useState } from "react";
import FriendId from "./FriendId";
import "./FriendsList.css";
import { useRecoilState } from "recoil";
import { loginuser } from "../../utils/atoms";
import { isRemittanceModalOpen } from "../../utils/atoms";
import RemittanceModal from "./RemittanceModal";

const FriendsList = () => {
  const [userData, setUserData] = useRecoilState(loginuser);
  const [frindsData, setFrindsData] = useState([]);
  const friends = [
    {
      name: "상익스트라",
      major: "경영학과",
      number: 201639874,
      grade: "3학년",
    },
    {
      name: "최상익",
      major: "경영학과",
      number: 201904874,
      grade: "1학년",
    },
    {
      name: "김동동",
      major: "식품공학과",
      number: 201632084,
      grade: "2학년",
    },
    {
      name: "김동그라미",
      major: "식품공학과",
      number: 201632084,
      grade: "2학년",
    },
    {
      name: "윤자롱",
      major: "반할과",
      number: 201725304,
      grade: "1학년",
    },
    {
      name: "상훈쨩",
      major: "심심한데 뽀뽀나할과",
      number: 201432984,
      grade: "1학년",
    },
    {
      name: "이가용",
      major: "아랍어과",
      number: 201890724,
      grade: "4학년",
    },
    {
      name: "정수완쓰",
      major: "경제학과",
      number: 201932084,
      grade: "1학년",
    },
    {
      name: "식식이",
      major: "배고플과",
      number: 201032084,
      grade: "4학년",
    },
    {
      name: "세울이",
      major: "마른사람과",
      number: 201432084,
      grade: "1학년",
    },
    {
      name: "진진이",
      major: "직장인과",
      number: 202033584,
      grade: "4학년",
    },
    {
      name: "이제노",
      major: "몸매천재과",
      number: 202350884,
      grade: "1학년",
    },
    {
      name: "나재민",
      major: "존잘과",
      number: 2015336584,
      grade: "1학년",
    },
    {
      name: "재현",
      major: "인형일과",
      number: 2016357084,
      grade: "3학년",
    },
    {
      name: "배고프다",
      major: "배고파파과",
      number: 2011057084,
      grade: "3학년",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useRecoilState(isRemittanceModalOpen);

  // const getFriendList = async () => {
  //   try {
  //     const response = await api.get(`/api2/sshh/freinds/${loginuser.student_id}`);
  //     if (response.status === 200) {
  //       setFrindsData(response.data);
  //     }
  //   } catch (error) {
  //     // 에러 처리
  //   }
  // };

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
            {friends.map((friend, index) => (
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
