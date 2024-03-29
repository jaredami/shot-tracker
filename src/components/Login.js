import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login({ isLoginRoute }) {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !isLoginRoute &&
      passwordRef.current.value !== passwordConfirmRef.current.value
    ) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if (isLoginRoute) {
        await login(email, password);
      } else {
        const userName = userNameRef.current.value;
        await signup(userName, email, password);
      }

      history.push("/");
    } catch {
      setError(`Failed to ${isLoginRoute ? "log in" : "create an account"}`);
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        {!isLoginRoute && (
          <div className="login-form-row" id="user-name">
            <label>User Name</label>
            <input type="text" ref={userNameRef} required />
          </div>
        )}
        <div className="login-form-row" id="email">
          <label>Email</label>
          <input type="email" ref={emailRef} required />
        </div>
        <div className="login-form-row" id="password">
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
        {!isLoginRoute && (
          <div className="login-form-row" id="password-confirm">
            <label>Password Confirmation</label>
            <input type="password" ref={passwordConfirmRef} required />
          </div>
        )}
        {error && <div className="login-error">{error}</div>}
        <button disabled={loading} className="login-btn" type="submit">
          {isLoginRoute ? "Log In" : "Sign Up"}
        </button>
      </form>

      {isLoginRoute ? (
        <div className="login-links-container">
          {/* <Link to="/forgot-password">Forgot Password?</Link> */}
          <div>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      ) : (
        <div className="login-links-container">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
}
