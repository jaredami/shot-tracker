import React from "react";
import * as styles from "./History.module.css";

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

const sessions = [
  {
    id: 1,
    date: "5/22/21",
    percentage: "43",
    shotsMade: "43/100",
    bestStreak: "8",
  },
  {
    id: 2,
    date: "5/21/21",
    percentage: "36",
    shotsMade: "36/100",
    bestStreak: "3",
  },
  {
    id: 3,
    date: "5/20/21",
    percentage: "51",
    shotsMade: "51/100",
    bestStreak: "5",
  },
  {
    id: 4,
    date: "5/20/21",
    percentage: "48",
    shotsMade: "48/100",
    bestStreak: "14",
  },
  {
    id: 5,
    date: "5/19/21",
    percentage: "33",
    shotsMade: "33/100",
    bestStreak: "4",
  },
  {
    id: 6,
    date: "5/18/21",
    percentage: "47",
    shotsMade: "47/100",
    bestStreak: "5",
  },
  {
    id: 7,
    date: "5/16/21",
    percentage: "61",
    shotsMade: "61/100",
    bestStreak: "14",
  },
  {
    id: 8,
    date: "5/12/21",
    percentage: "58",
    shotsMade: "58/100",
    bestStreak: "7",
  },
  {
    id: 9,
    date: "5/11/21",
    percentage: "41",
    shotsMade: "41/100",
    bestStreak: "11",
  },
  {
    id: 10,
    date: "5/10/21",
    percentage: "55",
    shotsMade: "55/100",
    bestStreak: "8",
  },
];
