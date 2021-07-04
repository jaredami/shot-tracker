import React from "react";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  return (
    <div className={styles.rankingsContainer}>
      {data.map((user) => (
        <div key={user.userId} className={styles.userCard}>
          <div className={styles.userPicContainer}>
            <i className="fas fa-user"></i>
          </div>
          <div>{user.userName}</div>
          <div>{user.percentage}</div>
        </div>
      ))}
    </div>
  );
}

const data = [
  {
    userId: 1,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 2,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 3,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 4,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 5,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 6,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 7,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 8,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 9,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 10,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 11,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 12,
    userName: "Domantas Sabonis",
    percentage: 33,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
];
