import React, { useState } from "react";
import { putMylocationState } from "../services/apiService";

const usePostGPSState = () => {
  const handlePutMyLocationState = async (
    studentId: Number,
    locationState: boolean
  ) => {
    try {
      const response = await putMylocationState(studentId, locationState);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return { handlePutMyLocationState };
};

export default usePostGPSState;
