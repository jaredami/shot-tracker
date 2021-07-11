import React, { useState } from "react";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  function toggleDropdown() {
    setIsDropdownExpanded(!isDropdownExpanded);
  }
  return (
    <div className={styles.rankingsContainer}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={() => toggleDropdown()}>
          Stat
          <i className="fa fa-caret-down"></i>
        </button>
        <div
          className={`${styles.dropdownContent} ${
            isDropdownExpanded ? styles.visible : ""
          }`}
        >
          <a href="#">Percentage</a>
          <a href="#">Shots Made</a>
          <a href="#">Shots Taken</a>
          <a href="#">Best Streak</a>
        </div>
      </div>
      {data.map((user, index) => (
        <div key={user.userId} className={styles.userCard}>
          <div className={styles.rank}>{index + 1}</div>
          <div className={styles.userInfoContainer}>
            <div className={styles.userPicContainer}>
              <i className="fas fa-user"></i>
            </div>
            <div>{user.userName}</div>
            <div>{user.percentage}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const data = [
  {
    userId: 1,
    userName: "Domantas Sabonis",
    percentage: 56,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 2,
    userName: "Goga Bitadze",
    percentage: 55,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 3,
    userName: "Malcolm Brogdon",
    percentage: 54,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 4,
    userName: "Aaron Holiday",
    percentage: 52,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 5,
    userName: "T.J. McConnell",
    percentage: 50,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 6,
    userName: "Justin Holiday",
    percentage: 48,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 7,
    userName: "Doug McDermott",
    percentage: 47,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 8,
    userName: "T.J. Warren",
    percentage: 45,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 9,
    userName: "Myles Turner",
    percentage: 42,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 10,
    userName: "Jeremy Lamb",
    percentage: 42,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 11,
    userName: "JaKarr Sampson",
    percentage: 41,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 12,
    userName: "Edmond Sumner",
    percentage: 39,
    shotsMade: 33,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
];