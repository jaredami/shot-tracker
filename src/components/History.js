import React from "react";
import "./History.css";

const sessions = [
  {
    id: 1,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 2,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 3,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 4,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 5,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
];

export default function History() {
  return (
    <div>
      {sessions.map((session) => (
        <div className="session" key={session.id}>
          <div>{session.date}</div>
          <div>{session.percentage}</div>
          <div>{session.shotsMade}</div>
          <div>{session.bestStreak}</div>
        </div>
      ))}
    </div>
  );
}
