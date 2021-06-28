import React from "react";
import * as styles from "./History.module.css";

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
  {
    id: 6,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 7,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 8,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 9,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
  {
    id: 10,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "9",
  },
];

export default function History() {
  return (
    <div className={styles.historyContainer}>
      {sessions.map((session) => (
        <div className={styles.session} key={session.id}>
          <div className={styles.date}>{session.date}</div>
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
              <div className={styles.stat}>{session.bestStreak}</div>
              <div className={styles.statLabel}>Best Streak</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
