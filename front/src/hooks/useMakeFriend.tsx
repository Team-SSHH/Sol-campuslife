import { postMakeFriend } from "../services/apiService";
import api1 from "../utils/api1";

const useMakeFriend = () => {
  const handleMakeFriend = async (studentId: Number, friendId: Number) => {
    try {
      const response = await postMakeFriend(studentId, friendId);
    } catch (error) {
      //  error status 400이면 이미 친구입니다
      // error status 404 이면 없는 친구입니다.
      // 나중에 확인하고 넣ㅇ기
      console.log(error);
    }
  };

  return { handleMakeFriend };
};

export default useMakeFriend;
