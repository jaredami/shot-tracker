import firebase from "firebase/app";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import "./Session.css";

export default function Session(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timer, setTimer] = useState("--:--");
  const [isRunning, setIsRunning] = useState(false);

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
    isRunning ? 1000 : null
  );

  function handleIsRunningChange() {
    setIsRunning(!isRunning);
  }

  const { currentUser } = useAuth();
  const [sessionStarted, setSessionStarted] = useState(false);
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

  function logSession() {
    const session = {
      userId: currentUser.uid,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      shotsTaken: shotsTakenCount,
      shotsMade: shotsMadeCount,
      bestStreak,
    };
    db.collection("sessions").doc().set(session);
    resetSession();
    // TODO prevent spamming logSession button
  }

  function resetSession() {
    setShotsTakenCount(0);
    setShotsMadeCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setSessionStarted(false);
  }

  return (
    <div className="container">
      <div
        className={`timer-container ${
          !isRunning ? "timer-container--paused" : ""
        }`}
        onClick={() => handleIsRunningChange()}
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
        <button className="make-miss-btn miss-btn" onClick={() => handleMiss()}>
          MISS
        </button>
        <button className="make-miss-btn make-btn" onClick={() => handleMake()}>
          MAKE
        </button>
        <button
          className="log-session-btn"
          onClick={() => logSession()}
          disabled={!sessionStarted}
        >
          LOG SESSION
        </button>
      </div>
    </div>
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
