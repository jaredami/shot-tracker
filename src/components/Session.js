import { useState } from "react";
import "./Session.css";

export default function Session(props) {
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
      <h2 className="session-stat">
        {shotsMadeCount}/{shotsTakenCount}
      </h2>
      <h2 className="session-stat">{getPercentage()}</h2>
      <div className="buttons-container">
        <button onClick={() => handleMiss()}>Miss</button>
        <button onClick={() => handleMake()}>Make</button>
      </div>
    </>
  );
}
