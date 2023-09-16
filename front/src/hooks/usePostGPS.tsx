import React, { useState } from "react";
import useGPSLocation from "./useGPSLocation";
import { putMylocation } from "../services/apiService";

const usePostGPS = () => {
  const MyLocation = useGPSLocation();

  const handlePutMyLocation: any = async (studentId: Number) => {
    if (MyLocation.latitude !== null && MyLocation.longitude !== null) {
      try {
        const response = await putMylocation(
          studentId,
          MyLocation.latitude,
          MyLocation.longitude
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { handlePutMyLocation };
};

export default usePostGPS;
