import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { calcPercentage } from "../util/utils";
import EditSessionModal from "./EditSessionModal";
import * as styles from "./History.module.css";
import LoadingIndicator from "./LoadingIndicator";
import Toast from "./Toast";
import Select from "react-select";

// TODO extract and share with Session?
const userSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "#222626",
    // Match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrites the different states of border
    borderColor: state.isFocused ? "#5c8688" : null,
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrites the different states of border
      borderColor: state.isFocused ? "#5c8688" : "#dedae0",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#dedae0",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#dedae0",
  }),
  menu: (base) => ({
    ...base,
    // Override border radius to match the box
    borderRadius: 0,
    // Kill the gap
    marginTop: 0,
    background: "#2d3134",
  }),
  menuList: (base) => ({
    ...base,
    // Kill the white space on first and last option
    padding: 0,
  }),
  option: (styles, state) => {
    return {
      ...styles,
      backgroundColor: state.isFocused ? "#505155" : null,
    };
  },
};

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

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserOption, setSelectedUserOption] = useState();
  const [selectedUserData, setSelectedUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingUsers(true);

      const usersDocs = await db.collection("users").get();
      let userOptionsArray = [];
      usersDocs.forEach((doc) => {
        const userData = doc.data();
        userOptionsArray.push({ value: doc.id, label: userData.userName });
      });
      console.log("userOptionsArray", userOptionsArray);
      setUserOptions(userOptionsArray);

      setIsLoadingUsers(false);
    };
    fetchData();
  }, []);

  // auto-select current user when component loads
  useEffect(() => {
    if (!userOptions.length) return;

    const currentUserOption = userOptions.find(
      (option) => option.value === currentUser.uid
    );
    if (!currentUserOption) return;

    handleUserSelected(currentUserOption);
  }, [userOptions, currentUser]);

  async function handleUserSelected(event) {
    if (!event) return;
    setSelectedUserOption(event);

    const userId = event.value;
    await db
      .collection("users")
      .doc(userId)
      .get()
      .then((userDoc) => {
        setSelectedUserData({ id: userDoc.id, ...userDoc.data() });
      });
  }

  useEffect(() => {
    if (!selectedUserData) return;

    const fetchData = async () => {
      setIsLoading(true);

      const data = await db
        .collection("sessions")
        .where("userId", "==", selectedUserData.id)
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
  }, [selectedUserData, isTimestampSortOrderDesc]);

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
  // TODO need to refresh data after update
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
    const totalShotsTaken = selectedUserData.totalShotsTaken + shotsTakenDiff;

    const shotsMadeDiff =
      updatedSession.shotsMade - sessionBeingEdited.shotsMade;
    const totalShotsMade = selectedUserData.totalShotsMade + shotsMadeDiff;

    const bestStreakEver =
      selectedUserData.bestStreakEver >= updatedSession.bestStreak
        ? selectedUserData.bestStreakEver
        : updatedSession.bestStreak;

    const totalPercentage = calcPercentage(totalShotsMade, totalShotsTaken);

    const userData = {
      totalShotsMade,
      bestStreakEver,
      totalShotsTaken,
      totalPercentage,
    };
    var userRef = db.collection("users").doc(selectedUserData.id);
    batch.set(userRef, userData, { merge: true });
  }

  return (
    <>
      <div className={styles.historyContainer}>
        {currentUserData && currentUserData.isAdmin && (
          <div>
            <p>Log session for:</p>
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={selectedUserOption}
              isDisabled={false}
              isLoading={isLoadingUsers}
              isRtl={false}
              isSearchable={true}
              name="color"
              onChange={handleUserSelected}
              options={userOptions}
              styles={userSelectStyles}
            />
          </div>
        )}
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
