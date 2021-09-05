import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login({ isLoginRoute }) {
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
        await signup(email, password);
      }

      history.push("/");
    } catch {
      setError(`Failed to ${isLoginRoute ? "log in" : "create an account"}`);
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      {error && <div variant="danger">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
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
        <button disabled={loading} className="log-in-btn" type="submit">
          {isLoginRoute ? "Log In" : "Sign Up"}
        </button>
      </form>

      {isLoginRoute ? (
        <div>
          <div className="">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="sign-up-btn">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      ) : (
        <div className="sign-up-btn">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      )}
    </div>
  );
}
