import React from "react";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <a href="#">
        <i class="fas fa-basketball-ball"></i>
        <b>train</b>
      </a>
      <a href="#">
        <i class="fas fa-chart-bar"></i>
        <b>home</b>
      </a>
      <a href="#">
        <i class="fas fa-list-ol"></i>
        <b>settings</b>
      </a>
      <span></span>
    </nav>
  );
}
