import firebase from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { Prompt } from "react-router";
import Select from "react-select";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { calcPercentage } from "../util/utils";
import Modal from "./Modal";
import "./Session.css";
import Toast from "./Toast";

export default function Session(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timer, setTimer] = useState("--:--");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isLogConfirmationModalDisplayed, setIsLogConfirmationModalDisplayed] =
    useState(false);
  const [
    isResetConfirmationModalDisplayed,
    setIsResetConfirmationModalDisplayed,
  ] = useState(false);

  useInterval(
    () => {
      setSeconds(seconds + 1);
      if (seconds >= 60) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      const newTimer =
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);
      setTimer(newTimer);
    },
    sessionStarted ? 1000 : null
  );

  const { currentUser, currentUserData } = useAuth();
  const [shotsTakenCount, setShotsTakenCount] = useState(0);
  const [shotsMadeCount, setShotsMadeCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [toast, setToast] = useState(null);

  function handleMiss() {
    setSessionStarted(true);
    setShotsTakenCount(shotsTakenCount + 1);
    setCurrentStreak(0);
  }

  function handleMake() {
    setSessionStarted(true);
    setShotsTakenCount(shotsTakenCount + 1);
    setShotsMadeCount(shotsMadeCount + 1);
    setCurrentStreak(currentStreak + 1);
    if (currentStreak >= bestStreak) {
      setBestStreak(currentStreak + 1);
    }
  }

  function getPercentage() {
    return shotsTakenCount
      ? calcPercentage(shotsMadeCount, shotsTakenCount) + "%"
      : "--";
  }

  function handleLogSessionClicked() {
    setToast(null);
    setIsLogConfirmationModalDisplayed(true);
  }

  function cancelLogSession() {
    setIsLogConfirmationModalDisplayed(false);
  }

  function logSession() {
    try {
      const batch = db.batch();
      addSessionToBatch(batch);
      addUpdatedUserDataToBatch(batch);
      batch.commit();
      resetSession();
      setIsLogConfirmationModalDisplayed(false);
      setToast({ message: "Session logged successfully!", type: "success" });
      setTimeout(() => {
        setToast("");
      }, 5000);
    } catch (error) {
      console.error("error", error);
      setIsLogConfirmationModalDisplayed(false);
      setToast({
        message: "There was a problem logging your session. Please try again.",
        type: "error",
      });
      setTimeout(() => {
        setToast("");
      }, 5000);
    }
  }

  function addSessionToBatch(batch) {
    const session = {
      userId: currentUser.uid,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      shotsTaken: shotsTakenCount,
      shotsMade: shotsMadeCount,
      bestStreak,
    };
    var sessionsRef = db.collection("sessions").doc();
    batch.set(sessionsRef, session);
  }

  function addUpdatedUserDataToBatch(batch) {
    const totalShotsTaken = currentUserData?.totalShotsTaken
      ? currentUserData.totalShotsTaken + shotsTakenCount
      : shotsTakenCount;
    const totalShotsMade = currentUserData?.totalShotsMade
      ? currentUserData.totalShotsMade + shotsMadeCount
      : shotsMadeCount;
    const bestStreakEver = currentUserData?.bestStreakEver
      ? currentUserData.bestStreakEver >= bestStreak
        ? currentUserData.bestStreakEver
        : bestStreak
      : bestStreak;
    const totalSessions = currentUserData?.totalSessions
      ? currentUserData.totalSessions + 1
      : 1;
    const totalPercentage = currentUserData?.totalPercentage
      ? calcPercentage(
          currentUserData.totalShotsMade + shotsMadeCount,
          currentUserData.totalShotsTaken + shotsTakenCount
        )
      : calcPercentage(shotsMadeCount, shotsTakenCount);
    const userData = {
      totalShotsMade,
      bestStreakEver,
      totalShotsTaken,
      totalSessions,
      totalPercentage,
    };
    var userRef = db.collection("users").doc(currentUser.uid);
    batch.set(userRef, userData, { merge: true });
  }

  function handleResetSessionClicked() {
    setToast(null);
    setIsResetConfirmationModalDisplayed(true);
  }

  function cancelResetSession() {
    setIsResetConfirmationModalDisplayed(false);
  }

  function resetSession() {
    setShotsTakenCount(0);
    setShotsMadeCount(0);
    setCurrentStreak(0);
    setBestStreak(0);

    setSessionStarted(false);
    setSeconds(0);
    setMinutes(0);
    setTimer("--:--");

    setIsResetConfirmationModalDisplayed(false);
  }

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(currentUser.uid);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingUsers(true);

      const usersData = await db
        .collection("users")
        .where("totalSessions", ">", 0)
        .get();
      let options = [];
      usersData.forEach((doc) => {
        options.push({ value: doc.id, label: doc.data().userName });
      });
      setUserOptions(options);

      setIsLoadingUsers(false);
    };
    fetchData();
  }, []);

  function handleUserSelected(event) {
    setSelectedUserId(event.value);
  }

  return (
    <>
      <Prompt
        when={sessionStarted}
        message="If you leave without logging the current session, it will not be saved. Are you sure you want to leave?"
      />
      <div className="container">
        <div
          className={`timer-container ${
            !sessionStarted ? "timer-container--paused" : ""
          }`}
        >
          <div className="timer">{timer}</div>
        </div>
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={userOptions[0]}
          isDisabled={false}
          isLoading={isLoadingUsers}
          isClearable={true}
          isRtl={false}
          isSearchable={true}
          name="color"
          onChange={handleUserSelected}
          options={userOptions}
        />
        <div className="session-grid">
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
            <p className="stat">{currentStreak}</p>
            <p className="stat-label">Current Streak</p>
          </div>
          <div className="stat-container">
            <p className="stat">{bestStreak}</p>
            <p className="stat-label">Best Streak</p>
          </div>
          <button
            className="make-miss-btn miss-btn"
            onClick={() => handleMiss()}
            disabled={isLogConfirmationModalDisplayed}
          >
            MISS
          </button>
          <button
            className="make-miss-btn make-btn"
            onClick={() => handleMake()}
            disabled={isLogConfirmationModalDisplayed}
          >
            MAKE
          </button>
          <button
            className="log-session-btn"
            onClick={() => handleResetSessionClicked()}
            disabled={!sessionStarted || isResetConfirmationModalDisplayed}
          >
            <i className="fas fa-redo-alt"></i>
          </button>
          <button
            className="log-session-btn"
            onClick={() => handleLogSessionClicked()}
            disabled={!sessionStarted || isLogConfirmationModalDisplayed}
          >
            LOG SESSION
          </button>
        </div>
      </div>
      {isLogConfirmationModalDisplayed && (
        <Modal
          message="Are you sure you want to LOG the current session?"
          onConfirm={() => logSession()}
          onCancel={() => cancelLogSession()}
        />
      )}
      {isResetConfirmationModalDisplayed && (
        <Modal
          message="Are you sure you want to CLEAR the current session?"
          onConfirm={() => resetSession()}
          onCancel={() => cancelResetSession()}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
