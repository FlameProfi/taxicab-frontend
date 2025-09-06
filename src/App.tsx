import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import AutoParkPage from "./Pages/AutoParkPage";
import EmployeeList from "./Pages/EmployeePage";
import CallList from "./Pages/CallPage";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/MainPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="autopark" element={<AutoParkPage />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="calls" element={<CallList />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
