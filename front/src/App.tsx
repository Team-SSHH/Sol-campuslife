import React from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import NavBar from "./components/common/NavBar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
