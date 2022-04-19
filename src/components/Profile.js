import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingIndicator from "./LoadingIndicator";
import "./Profile.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, currentUserData, loading } = useAuth();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      userName: currentUserData?.userName,
      email: currentUser.email,
    },
  });
  const history = useHistory();

  useEffect(() => {
    reset({
      userName: currentUserData?.userName,
      email: currentUser.email,
    });
  }, [currentUserData?.userName, currentUser.email, reset]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function onSubmit(formData) {
    const { userName, email } = formData;
    console.log("userName", userName);
    console.log("email", email);
    // TODO: submit profile data updates here
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
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              {error && <div>{error}</div>}
              <div className="login-form-row" id="user-name">
                <label>User Name</label>
                <input type="text" {...register("userName")} />
              </div>
              <div className="login-form-row" id="email">
                <label>Email</label>
                <input type="email" {...register("email")} />
              </div>
              <button
                disabled={!formState.isDirty}
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
