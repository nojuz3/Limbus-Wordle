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
        <div>
          <button onClick={() => navigate("/")} class="home-button"></button>
        </div>
        <div></div>
      </div>
      <div class="main">
        <div class="play">
          <div>
            <Routes>
              <Route path="/" element={<Select />} />
              <Route path="/Ego" element={<Ego />} />
              <Route path="/Identity" element={<Identity />} />
            </Routes>
          </div>
        </div>
      </div>
      <div class="footer">Footer</div>
    </>
  );
}
