import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <NavLink activeClassName="active" to="/train">
        <i className="fas fa-basketball-ball"></i>
        <b>Train</b>
      </NavLink>
      <NavLink activeClassName="active" to="/history">
        <i className="fas fa-chart-bar"></i>
        <b>History</b>
      </NavLink>
      <NavLink activeClassName="active" to="/rankings">
        <i className="fas fa-list-ol"></i>
        <b>Rankings</b>
      </NavLink>
      <span></span>
    </nav>
  );
}
