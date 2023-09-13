import { useState, useEffect } from "react";
import { FriendType } from "../types/DataType";
import { getFriendList } from "../services/apiService";

type DataType = {
  categoryId: number;
  category: string;
  studentId: number;
  friend: FriendType;
  fid: number;
};

const useFriendListData = (studentId: Number) => {
  const [friendsData, setFriendsData] = useState<Array<FriendType>>([]);
  const [MyfriendStudentIds, setMyFriendStudentIds] = useState<Array<number>>(
    []
  );

  const fetchFriendList = async () => {
    try {
      const response = await getFriendList(studentId);

      const extractFriends = (data: DataType[]): FriendType[] => {
        return data.map((item) => item.friend);
      };

      const new_friends: Array<FriendType> = extractFriends(response.data);
      setFriendsData(new_friends);

      const new_friend_ids: Array<number> = new_friends.map(
        (friend) => friend.studentId
      );
      setMyFriendStudentIds(new_friend_ids);
      // setFriendsData(response.data);
    } catch (error) {
      // 에러 처리
    }
  };
  useEffect(() => {
    fetchFriendList();
  }, [studentId]);

  return { friendsData, fetchFriendList, setFriendsData, MyfriendStudentIds };
};

export default useFriendListData;
