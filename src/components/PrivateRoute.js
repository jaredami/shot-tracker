import React from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./App.css";

export default function PrivateRoute({
  component: Component,
  pageTitle,
  ...rest
}) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <div className="header-container">
              <div className="header-content-container">
                <h1 className="header">{pageTitle}</h1>
                <NavLink
                  className="profile-icon"
                  activeClassName="profile-link-active"
                  to="/profile"
                >
                  <i className="fas fa-user-circle"></i>
                </NavLink>
              </div>
              <hr />
            </div>
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
