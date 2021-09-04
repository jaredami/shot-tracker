import React from "react";
import { NavLink } from "react-router-dom";
import "./PageHeader.css";

export default function PageHeader({ pageTitle, displaysProfileBtn }) {
  return (
    <div className="header-container">
      <div className="header-content-container">
        <h1 className="header">{pageTitle}</h1>
        {displaysProfileBtn && (
          <NavLink
            className="profile-icon"
            activeClassName="profile-link-active"
            to="/profile"
          >
            <i className="fas fa-user-circle"></i>
          </NavLink>
        )}
      </div>
      <hr />
    </div>
  );
}
