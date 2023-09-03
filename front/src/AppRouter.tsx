import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StudentIdPage from "./pages/StudentIdPage";
import Fxrate from "./pages/Fxrate";
import BankLocationPage from "./pages/BankLocationPage";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Main" element={<MainPage />}></Route>
          <Route path="/StudentId" element={<StudentIdPage />}></Route>
          <Route path="/Fxrate" element={<Fxrate />}></Route>
          <Route path="/BankLocation" element={<BankLocationPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
