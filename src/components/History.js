import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { calcPercentage } from "../util/utils";
import EditSessionModal from "./EditSessionModal";
import * as styles from "./History.module.css";
import LoadingIndicator from "./LoadingIndicator";
import Toast from "./Toast";

export default function History() {
  const { currentUser, currentUserData } = useAuth();
  const [sessions, setSessions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTimestampSortOrderDesc, setIsTimestampSortOrderDesc] =
    useState(true);
  const [isEditSessionModalDisplayed, setIsEditSessionModalDisplayed] =
    useState(false);
  const [sessionBeingEdited, setSessionBeingEdited] = useState();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await db
        .collection("sessions")
        .where("userId", "==", currentUser.uid)
        .orderBy("timestamp", isTimestampSortOrderDesc ? "desc" : "asc")
        .get();

      setIsLoading(false);

      const sessionsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSessions(
        sessionsData.map((session) => {
          return {
            ...session,
            date: session.timestamp.toDate().toDateString(),
            percentage: calcPercentage(session.shotsMade, session.shotsTaken),
          };
        })
      );
    };
    fetchData();
  }, [currentUser.uid, isTimestampSortOrderDesc]);

  function toggleTimestampSortOrder() {
    setIsTimestampSortOrderDesc(!isTimestampSortOrderDesc);
  }

  function handleSessionEditButtonClicked(session) {
    setIsEditSessionModalDisplayed(true);
    setSessionBeingEdited(session);
  }

  function cancelEditingSession() {
    setIsEditSessionModalDisplayed(false);
    setSessionBeingEdited(null);
  }

  // TODO only update things that have changed
  function updateSession(updatedSession) {
    try {
      const batch = db.batch();
      addSessionToBatch(batch, updatedSession);
      addUpdatedUserDataToBatch(batch, updatedSession);
      batch.commit();
      setIsEditSessionModalDisplayed(false);
      setToast({ message: "Session updated successfully!", type: "success" });
      setTimeout(() => {
        setToast("");
      }, 5000);
    } catch (error) {
      console.error("error", error);
      setIsEditSessionModalDisplayed(false);
      setToast({
        message: "There was a problem updating the session. Please try again.",
        type: "error",
      });
      setTimeout(() => {
        setToast("");
      }, 5000);
    }
  }

  function addSessionToBatch(batch, updatedSession) {
    var sessionsRef = db.collection("sessions").doc(sessionBeingEdited.id);
    batch.set(sessionsRef, updatedSession, { merge: true });
  }

  function addUpdatedUserDataToBatch(batch, updatedSession) {
    const shotsTakenDiff =
      updatedSession.shotsTaken - sessionBeingEdited.shotsTaken;
    const totalShotsTaken = currentUserData.totalShotsTaken + shotsTakenDiff;

    const shotsMadeDiff =
      updatedSession.shotsMade - sessionBeingEdited.shotsMade;
    const totalShotsMade = currentUserData.totalShotsMade + shotsMadeDiff;

    const bestStreakEver =
      currentUserData.bestStreakEver >= updatedSession.bestStreak
        ? currentUserData.bestStreakEver
        : updatedSession.bestStreak;

    const totalPercentage = calcPercentage(totalShotsMade, totalShotsTaken);

    const userData = {
      totalShotsMade,
      bestStreakEver,
      totalShotsTaken,
      totalPercentage,
    };
    var userRef = db.collection("users").doc(currentUserData.id);
    batch.set(userRef, userData, { merge: true });
  }

  return (
    <>
      <div className={styles.historyContainer}>
        <button
          className={styles.sortOrderButton}
          onClick={() => toggleTimestampSortOrder()}
        >
          <i
            className={`fas fa-caret-${
              isTimestampSortOrderDesc ? "down" : "up"
            }`}
          ></i>
        </button>
        {isLoading ? (
          <LoadingIndicator />
        ) : sessions && sessions.length ? (
          sessions.map((session, index) => {
            const style = { "--animation-order": index + 1 };
            return (
              <div style={style} className={styles.session} key={session.id}>
                <div className={styles.date}>
                  <span>{session.date}</span>
                  {currentUserData && currentUserData.isAdmin && (
                    <button
                      className={styles.editSessionButton}
                      onClick={() => handleSessionEditButtonClicked(session)}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  )}
                </div>
                <div className={styles.statsContainer}>
                  <div className={styles.statContainer}>
                    <div className={styles.stat}>{session.percentage}</div>
                    <div className={styles.statLabel}>Percentage</div>
                  </div>
                  <div className={styles.statContainer}>
                    <div className={styles.stat}>{session.shotsMade}</div>
                    <div className={styles.statLabel}>Shots Made</div>
                  </div>
                  <div className={styles.statContainer}>
                    <div className={styles.stat}>{session.shotsTaken}</div>
                    <div className={styles.statLabel}>Shots Taken</div>
                  </div>
                  <div className={styles.statContainer}>
                    <div className={styles.stat}>{session.bestStreak}</div>
                    <div className={styles.statLabel}>Best Streak</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Sessions Logged</div>
        )}
      </div>
      {isEditSessionModalDisplayed && (
        <EditSessionModal
          onSave={updateSession}
          onCancel={() => cancelEditingSession()}
          sessionBeingEdited={{ ...sessionBeingEdited }}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
