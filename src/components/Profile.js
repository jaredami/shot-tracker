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
        currentUserData && (
          <div className="profile-container">
            <div className="profile-grid">
              <div className="stat-container">
                <p className="stat">{currentUserData.totalSessions}</p>
                <p className="stat-label">Sessions</p>
              </div>
              <div className="stat-container">
                <p className="stat">
                  {currentUserData.totalShotsMade}/
                  {currentUserData.totalShotsTaken}
                </p>
                <p className="stat-label">Shots Made</p>
              </div>
              <div className="stat-container">
                <p className="stat">{currentUserData.totalPercentage}</p>
                <p className="stat-label">Percentage</p>
              </div>
              <div className="stat-container">
                <p className="stat">{currentUserData.bestStreakEver}</p>
                <p className="stat-label">Best Streak</p>
              </div>
            </div>
            <div>
              <div>
                {error && <div variant="danger">{error}</div>}
                <strong>Email:</strong> {currentUser.email}
                {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
              </div>
            </div>
            <div className="">
              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}
