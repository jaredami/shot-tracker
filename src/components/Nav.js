import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <a href="#">
        <i className="fas fa-basketball-ball"></i>
        <b>train</b>
      </a>
      <a href="#">
        <i className="fas fa-chart-bar"></i>
        <b>home</b>
      </a>
      <a href="#">
        <i className="fas fa-list-ol"></i>
        <b>settings</b>
      </a>
      <span></span>
    </nav>
  );
}
