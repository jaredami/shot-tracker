import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndicator";
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

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((docRef) => {
          setUser(docRef.data());
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn(error);
        });
    };
    fetchData();
  }, [currentUser.uid]);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        user && (
          <div className="profile-container">
            <div className="profile-grid">
              <div className="stat-container">
                <p className="stat">{user.totalSessions}</p>
                <p className="stat-label">Sessions</p>
              </div>
              <div className="stat-container">
                <p className="stat">
                  {user.totalShotsMade}/{user.totalShotsTaken}
                </p>
                <p className="stat-label">Shots Made</p>
              </div>
              <div className="stat-container">
                <p className="stat">{user.totalPercentage}</p>
                <p className="stat-label">Percentage</p>
              </div>
              <div className="stat-container">
                <p className="stat">{user.bestStreakEver}</p>
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
