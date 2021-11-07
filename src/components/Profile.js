import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingIndicator from "./LoadingIndicator";
import "./Profile.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, currentUserData, loading } = useAuth();
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
          <div>
            {error && <div>{error}</div>}
            <p>
              <strong>User Name:</strong> {currentUserData?.userName}
            </p>
            <p>
              {console.log("currentUserData", currentUserData)}
              <strong>Email:</strong> {currentUser.email}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
}
