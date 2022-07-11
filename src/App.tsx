import React from "react";
import { AppBar, MainPage } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-cx-gray">
        <AppBar />
        <div className="flex flex-col justify-center mt-10 ">
          <MainPage />
        </div>
      </div>
    </div>
  );
}

export default App;
