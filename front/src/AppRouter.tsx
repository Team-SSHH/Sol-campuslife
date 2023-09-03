import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StudentIdPage from "./pages/StudentIdPage";
import FxratePage from "./pages/FxratePage";
import BankLocationPage from "./pages/BankLocationPage";
import FxrequestPage from "./pages/FxrequestPage";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Main" element={<MainPage />}></Route>
          <Route path="/StudentId" element={<StudentIdPage />}></Route>
          <Route path="/Fxrate" element={<FxratePage />}></Route>
          <Route path="/Fxrequest" element={<FxrequestPage />}></Route>
          <Route path="/BankLocation" element={<BankLocationPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
