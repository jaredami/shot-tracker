import firebase from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { Prompt } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Modal from "./Modal";
import "./Session.css";

export default function Session(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timer, setTimer] = useState("--:--");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

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
      ? Math.floor((shotsMadeCount / shotsTakenCount) * 100) + "%"
      : "--";
  }

  function handleLogSessionClicked() {
    setIsModalDisplayed(true);
  }

  function cancelLogSession() {
    setIsModalDisplayed(false);
  }

  function logSession() {
    const session = {
      userId: currentUser.uid,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      shotsTaken: shotsTakenCount,
      shotsMade: shotsMadeCount,
      bestStreak,
    };
    db.collection("sessions").doc().set(session);

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
      ? Math.floor(
          ((currentUserData.totalShotsMade + shotsMadeCount) /
            (currentUserData.totalShotsTaken + shotsTakenCount)) *
            100
        )
      : Math.floor((shotsMadeCount / shotsTakenCount) * 100);
    const userData = {
      totalShotsMade,
      bestStreakEver,
      totalShotsTaken,
      totalSessions,
      totalPercentage,
      // userName: currentUserData.userName,
      // email: currentUserData.email,
    };
    db.collection("users").doc(currentUser.uid).set(userData, { merge: true });

    resetSession();
    setIsModalDisplayed(false);
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
            disabled={isModalDisplayed}
          >
            MISS
          </button>
          <button
            className="make-miss-btn make-btn"
            onClick={() => handleMake()}
            disabled={isModalDisplayed}
          >
            MAKE
          </button>
          <button
            className="log-session-btn"
            onClick={() => handleLogSessionClicked()}
            disabled={!sessionStarted || isModalDisplayed}
          >
            LOG SESSION
          </button>
        </div>
      </div>
      {isModalDisplayed && (
        <Modal
          message="Are you sure you want to log the current session?"
          onConfirm={() => logSession()}
          onCancel={() => cancelLogSession()}
        />
      )}
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
