import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();

  function nav(res) {
    switch (res) {
      case "id":
        navigate("/identity");
        break;
      case "ego":
        navigate("/ego");
        break;
      default:
        console.log("error");
    }
  }
  return (
    <div className="container-pos">
      <div className="button-container">

        <div className="button-box">
          <button className="button" onClick={() => nav("id")}>
            Identity
          </button>
          <p>Identity</p>
        </div>

        <div className="button-box">
          <button className="button" onClick={() => nav("ego")}>
            Ego
          </button>
          <p>Ego</p>
        </div>
      </div>
    </div>
  );
}
