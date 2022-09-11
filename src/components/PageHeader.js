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
        {displaysProfileBtn && (
          <>
            <div className="user-name">{currentUserData?.userName}</div>
            <NavLink
              className="profile-link"
              activeClassName="profile-link-active"
              to="/profile"
            >
              {currentUserData?.profilePicUrl ? (
                <img
                  className="profile-pic"
                  src={currentUserData.profilePicUrl}
                  alt="profile pic"
                />
              ) : (
                <i className="fas fa-user-circle"></i>
              )}
            </NavLink>
          </>
        )}
      </div>
      <hr />
    </div>
  );
}
