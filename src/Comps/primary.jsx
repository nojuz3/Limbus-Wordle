import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Ego from "./pages/Ego";
import Select from "./pages/Select";
import Identity from "./pages/Identity"

export default function primary() {
    const navigate = useNavigate();
  return (
    <>
      <div class="header">
        <div class="headerBox">
          <button onClick={() => navigate("/")} class="home-button">Return To main</button>
        </div>
        <div></div>
      </div>
      <div class="main">
        <div class="play">
          <div class="play-2">
            <Routes>
              <Route path="/" element={<Select />} />
              <Route path="/ego" element={<Ego />} />
              <Route path="/identity" element={<Identity />} />
              <Route path="*" element={<Select/>} />
            </Routes>
          </div>
        </div>
      </div>
      <div class="footer">Footer</div>
    </>
  );
}
