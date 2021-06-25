import { useEffect, useState } from "react";
import "./Session.css";

export default function Session(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timer, setTimer] = useState("--:--");
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds >= 60) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      const newTimer =
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds);
      console.log("newTimer", newTimer);
      setTimer(newTimer);
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds]);

  const [shotsTakenCount, setShotsTakenCount] = useState(0);
  const [shotsMadeCount, setShotsMadeCount] = useState(0);

  function handleMiss() {
    setShotsTakenCount(shotsTakenCount + 1);
  }

  function handleMake() {
    setShotsTakenCount(shotsTakenCount + 1);
    setShotsMadeCount(shotsMadeCount + 1);
  }

  function getPercentage() {
    return shotsTakenCount
      ? Math.floor((shotsMadeCount / shotsTakenCount) * 100) + "%"
      : "--";
  }

  return (
    <>
      <div className="buttons-container">
        <button className="make-miss-btn miss-btn" onClick={() => handleMiss()}>
          MISS
        </button>
        <div className="timer-container">
          <div className="timer">{timer}</div>
        </div>
        <button className="make-miss-btn make-btn" onClick={() => handleMake()}>
          MAKE
        </button>
      </div>
      <p className="session-stat">
        Shots Made: {shotsMadeCount}/{shotsTakenCount}
      </p>
      <p className="session-stat">Percentage: {getPercentage()}</p>
    </>
  );
}
