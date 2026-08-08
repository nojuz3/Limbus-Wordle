import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Primary from "./Comps/primary";

function App() {
  
  return (
    <>
      <Router basename="/">
      <Primary />
      </Router>
    </>
  );
}

export default App;
