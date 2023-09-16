import React, { useState } from "react";
import useGPSLocation from "./useGPSLocation";
import { putMylocation } from "../services/apiService";

interface GganbuType {
  balance: number;
  bankNumber: number;
  distance: number;
  gender: string;
  grade: number;
  imageUrl: string;
  major: string;
  name: string;
  nationality: string;
  phoneId: string;
  studentId: number;
  university: string;
}

const usePostGPS = () => {
  const MyLocation = useGPSLocation();
  const [frienddata, setFriendData] = useState<Array<GganbuType>>([]);

  const handlePutMyLocation: any = async (studentId: Number) => {
    if (MyLocation.latitude !== null && MyLocation.longitude !== null) {
      try {
        const response = await putMylocation(
          studentId,
          MyLocation.latitude,
          MyLocation.longitude
        );
        console.log(response.data);
        setFriendData(response.data.friendList);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { handlePutMyLocation, frienddata };
};

export default usePostGPS;
