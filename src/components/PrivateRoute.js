import React from "react";
import { Route, Redirect } from "react-router-dom";
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
              <h1 className="header">{pageTitle}</h1>
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
