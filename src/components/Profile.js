import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [shotsTakenCount, setShotsTakenCount] = useState(0);
  const [shotsMadeCount, setShotsMadeCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  function getPercentage() {
    return shotsTakenCount
      ? Math.floor((shotsMadeCount / shotsTakenCount) * 100) + "%"
      : "--";
  }

  return (
    <div className="profile-container">
      <div className="session-grid">
        <div className="stat-container">
          <p className="stat">23</p>
          <p className="stat-label">Sessions</p>
        </div>
        <div className="stat-container">
          <p className="stat">
            {shotsMadeCount}/{shotsTakenCount}
          </p>
          <p className="stat-label">Shots Made</p>
        </div>
        <div className="stat-container">
          <p className="stat">{getPercentage()}</p>
          <p className="stat-label">Percentage</p>
        </div>
        <div className="stat-container">
          <p className="stat">{bestStreak}</p>
          <p className="stat-label">Best Streak</p>
        </div>
      </div>
      <div>
        <div>
          {error && <div variant="danger">{error}</div>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        <button variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
