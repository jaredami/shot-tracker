import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoadingIndicator from "./LoadingIndicator";
import "./Profile.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, currentUserData, loading } = useAuth();
  const history = useHistory();
  const userNameRef = useRef();
  const emailRef = useRef();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleSubmit() {
    console.log("test");
  }

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="profile-container">
          <div className="profile-grid">
            <div className="stat-container">
              <p className="stat">{currentUserData?.totalSessions || "0"}</p>
              <p className="stat-label">Sessions</p>
            </div>
            <div className="stat-container">
              <p className="stat">
                {currentUserData?.totalShotsMade || "-"}/
                {currentUserData?.totalShotsTaken || "-"}
              </p>
              <p className="stat-label">Shots Made</p>
            </div>
            <div className="stat-container">
              <p className="stat">{currentUserData?.totalPercentage || "-"}</p>
              <p className="stat-label">Percentage</p>
            </div>
            <div className="stat-container">
              <p className="stat">{currentUserData?.bestStreakEver || "-"}</p>
              <p className="stat-label">Best Streak</p>
            </div>
          </div>

          {/* TODO either copy styles in Profile.css or extract shared Form component */}
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              {error && <div>{error}</div>}
              <div className="login-form-row" id="user-name">
                <label>User Name</label>
                <input
                  defaultValue={currentUserData?.userName}
                  type="text"
                  ref={userNameRef}
                  required
                />
              </div>
              <div className="login-form-row" id="email">
                <label>Email</label>
                <input
                  defaultValue={currentUser.email}
                  type="email"
                  ref={emailRef}
                  required
                />
              </div>
              <button disabled={loading} className="logout-btn" type="submit">
                Save
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
