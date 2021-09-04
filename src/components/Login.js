import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  console.log("props", props);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
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
        <button disabled={loading} className="log-in-btn" type="submit">
          Log In
        </button>
      </form>
      <div className="">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="sign-up-btn">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
