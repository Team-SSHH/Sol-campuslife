import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StudentIdPage from "./pages/StudentIdPage";
import FxratePage from "./pages/FxratePage";
import BankLocationPage from "./pages/BankLocationPage";
import FxrequestPage from "./pages/FxrequestPage";
import FavoritePlacePage from "./pages/FavoritePlacePage";
import ConsumeLogPage from "./pages/ConsumeLogPage";
import LoginPage from "./pages/LoginPage";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Main" element={<MainPage />}></Route>
          <Route path="/StudentId" element={<StudentIdPage />}></Route>
          <Route path="/Fxrate" element={<FxratePage />}></Route>
          <Route path="/Fxrequest" element={<FxrequestPage />}></Route>
          <Route path="/BankLocation" element={<BankLocationPage />}></Route>
          <Route path="/FavoritePlace" element={<FavoritePlacePage />}></Route>
          <Route path="/ConsumeLog" element={<ConsumeLogPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
