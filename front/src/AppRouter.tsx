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
import NavBar from "./components/common/NavBar";
import Push from "./hooks/push";
import "./AppRouter.css";
import AlertPage from "./pages/AlertPage";
import Registerfriend from "./pages/RegisterFriendPage";
import FindMyGganbuPage from "./pages/FindMyGganbuPage";

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/Main" element={<MainPage />}></Route>
          <Route path="/StudentId" element={<StudentIdPage />}></Route>
          <Route path="/Fxrate" element={<FxratePage />}></Route>
          <Route path="/Fxrequest" element={<FxrequestPage />}></Route>
          <Route path="/BankLocation" element={<BankLocationPage />}></Route>
          <Route path="/FavoritePlace" element={<FavoritePlacePage />}></Route>
          <Route path="/Push" element={<Push />}></Route>
          <Route path="/ConsumeLog" element={<ConsumeLogPage />}></Route>
          <Route path="/Alert" element={<AlertPage />}></Route>
          <Route path="/Registerfriend" element={<Registerfriend />}></Route>
          <Route path="/FindMyGganbu" element={<FindMyGganbuPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
