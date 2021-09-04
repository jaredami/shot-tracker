import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./App.css";
import PageHeader from "./PageHeader";

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
            <PageHeader pageTitle={pageTitle} displaysProfileBtn={true} />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
