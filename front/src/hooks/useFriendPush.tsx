import { postMakeFriendAlarm } from "../services/apiService";

const useFriendPush = () => {
  const handleSendAlarm = async (studentId: Number, friendId: Number) => {
    try {
      const response = await postMakeFriendAlarm(studentId, friendId);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSendAlarm };
};

export default useFriendPush;
