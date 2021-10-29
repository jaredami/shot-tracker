import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./PageHeader.css";

export default function PageHeader({ pageTitle, displaysProfileBtn }) {
  const { currentUserData } = useAuth();
  return (
    <div className="header-container">
      <div className="header-content-container">
        <h1 className="header">{pageTitle}</h1>
        {displaysProfileBtn && currentUserData && (
          <>
            <div className="user-name">{currentUserData.userName}</div>
            <NavLink
              className="profile-icon"
              activeClassName="profile-link-active"
              to="/profile"
            >
              <i className="fas fa-user-circle"></i>
            </NavLink>
          </>
        )}
      </div>
      <hr />
    </div>
  );
}
