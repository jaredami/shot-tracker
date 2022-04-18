import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingIndicator from "./LoadingIndicator";
import "./Profile.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, currentUserData, loading } = useAuth();

  const history = useHistory();
  const userNameRef = useRef();
  const emailRef = useRef();
  const [isFormDirty, setIsFormDirty] = useState(false);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userName = userNameRef.current.value;
    console.log("userName", userName);
    const email = emailRef.current.value;
    console.log("email", email);
    // TODO: submit profile data updates here
  }

  function validateForm(e) {
    const userName = userNameRef.current.value;
    const email = emailRef.current.value;
    const nameIsDirty = userName !== currentUserData?.userName;
    const emailIsDirty = email !== currentUserData?.email;
    setIsFormDirty(nameIsDirty || emailIsDirty);

    // TODO: validate email format?
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
            <form
              className="login-form"
              onChange={validateForm}
              onSubmit={handleSubmit}
            >
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
              <button
                disabled={!isFormDirty}
                className="logout-btn"
                type="submit"
              >
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
