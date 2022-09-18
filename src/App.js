import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/welcome/WelcomePage";
import Home from "./components/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
