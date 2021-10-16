import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Profile.css";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndicator";

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

  const [isLoading, setIsLoading] = useState(false);
  const [totalShotsTakenCount, setTotalShotsTakenCount] = useState(0);
  const [totalShotsMadeCount, setTotalShotsMadeCount] = useState(0);
  const [bestStreakEver, setBestStreakEver] = useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let totalMade = 0;
      let totalTaken = 0;
      let bestStreak = 0;
      await db
        .collection("sessions")
        .where("userId", "==", currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            totalMade = totalMade + doc.data().shotsMade;
            totalTaken = totalTaken + doc.data().shotsTaken;
            if (doc.data().bestStreak > bestStreak)
              bestStreak = doc.data().bestStreak;
          });
        });

      setIsLoading(false);
      setTotalShotsMadeCount(totalMade);
      setTotalShotsTakenCount(totalTaken);
      setBestStreakEver(bestStreak);
    };
    fetchData();
  }, [currentUser.uid]);

  function getPercentage() {
    return totalShotsTakenCount
      ? Math.floor((totalShotsMadeCount / totalShotsTakenCount) * 100) + "%"
      : "--";
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <div className="profile-container">
          <div className="profile-grid">
            <div className="stat-container">
              <p className="stat">23</p>
              <p className="stat-label">Sessions</p>
            </div>
            <div className="stat-container">
              <p className="stat">
                {totalShotsMadeCount}/{totalShotsTakenCount}
              </p>
              <p className="stat-label">Shots Made</p>
            </div>
            <div className="stat-container">
              <p className="stat">{getPercentage()}</p>
              <p className="stat-label">Percentage</p>
            </div>
            <div className="stat-container">
              <p className="stat">{bestStreakEver}</p>
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
      )}
    </>
  );
}
