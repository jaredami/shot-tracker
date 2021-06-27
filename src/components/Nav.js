import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <NavLink activeClassName="active" to="/train">
        <i className="fas fa-basketball-ball"></i>
        <b>train</b>
      </NavLink>
      <NavLink activeClassName="active" to="/history">
        <i className="fas fa-chart-bar"></i>
        <b>history</b>
      </NavLink>
      <NavLink activeClassName="active" to="/rankings">
        <i className="fas fa-list-ol"></i>
        <b>rankings</b>
      </NavLink>
      <span></span>
    </nav>
  );
}
