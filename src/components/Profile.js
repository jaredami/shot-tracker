import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndicator";
import "./Profile.css";
import Toast from "./Toast";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, currentUserData, loading, updateEmail } =
    useAuth();
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      userName: currentUserData?.userName,
      email: currentUser.email,
    },
  });
  const watchUserName = watch("userName");
  const watchEmail = watch("email");
  const history = useHistory();
  const [toast, setToast] = useState(null);

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
    // TODO only attempt email update when email has changed; same for userName
    const { userName, email } = formData;
    updateEmail(email)
      .then(() => {
        db.collection("users").doc(currentUser.uid).update({ email, userName });
        setToast({
          message: "Profile updated successfully!",
          type: "success",
        });
        setTimeout(() => {
          setToast("");
        }, 5000);
      })
      .catch((error) => {
        console.error("error", error);
        setToast({
          message:
            error.message ??
            "There was a problem updating your profile. Please try again.",
          type: "error",
        });
        setTimeout(() => {
          setToast(null);
        }, 5000);
      });
  }

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
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
                <p className="stat">
                  {currentUserData?.totalPercentage || "-"}
                </p>
                <p className="stat-label">Percentage</p>
              </div>
              <div className="stat-container">
                <p className="stat">{currentUserData?.bestStreakEver || "-"}</p>
                <p className="stat-label">Best Streak</p>
              </div>
            </div>

            {console.log("watchUserName", watchUserName)}
            {/* TODO either copy styles in Profile.css or extract shared Form component */}
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
                disabled={
                  !formState.isDirty ||
                  !watchUserName.length ||
                  !watchEmail.length
                }
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
          {toast && <Toast message={toast.message} type={toast.type} />}
        </>
      )}
    </>
  );
}
