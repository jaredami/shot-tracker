import React, { useState } from "react";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [currentStat, setCurrentStat] = useState({
    label: "Percentage",
    value: "percentage",
  });

  function toggleDropdown() {
    setIsDropdownExpanded(!isDropdownExpanded);
  }

  function handleStatSelected(stat) {
    setCurrentStat(stat);
    setIsDropdownExpanded(false);
  }

  return (
    <>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={() => toggleDropdown()}>
          {currentStat.label}
          <i className="fa fa-caret-down"></i>
        </button>
        <div
          className={`${styles.dropdownContent} ${
            isDropdownExpanded ? styles.visible : ""
          }`}
        >
          <div
            onClick={() =>
              handleStatSelected({ label: "Percentage", value: "percentage" })
            }
          >
            Percentage
          </div>
          <div
            onClick={() =>
              handleStatSelected({ label: "Shots Made", value: "shotsMade" })
            }
          >
            Shots Made
          </div>
          <div
            onClick={() =>
              handleStatSelected({ label: "Shots Taken", value: "shotsTaken" })
            }
          >
            Shots Taken
          </div>
          <div
            onClick={() =>
              handleStatSelected({ label: "Best Streak", value: "bestStreak" })
            }
          >
            Best Streak
          </div>
        </div>
      </div>
      <div className={styles.rankingsContainer}>
        {data
          .sort((a, b) =>
            a[currentStat.value] < b[currentStat.value] ? 1 : -1
          )
          .map((user, index) => (
            <div key={user.userId} className={styles.userCard}>
              <div className={styles.rank}>{index + 1}</div>
              <div className={styles.userInfoContainer}>
                <div className={styles.userPicContainer}>
                  <i className="fas fa-user"></i>
                </div>
                <div>{user.userName}</div>
                <div>{user[currentStat.value]}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

const data = [
  {
    userId: 1,
    userName: "Domantas Sabonis",
    percentage: 56,
    shotsMade: 56,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 2,
    userName: "Goga Bitadze",
    percentage: 55,
    shotsMade: 55,
    shotsTaken: 100,
    bestStreak: 5,
    sessionCount: 1,
  },
  {
    userId: 3,
    userName: "Malcolm Brogdon",
    percentage: 54,
    shotsMade: 54,
    shotsTaken: 100,
    bestStreak: 8,
    sessionCount: 1,
  },
  {
    userId: 4,
    userName: "Aaron Holiday",
    percentage: 52,
    shotsMade: 52,
    shotsTaken: 100,
    bestStreak: 10,
    sessionCount: 1,
  },
  {
    userId: 5,
    userName: "T.J. McConnell",
    percentage: 50,
    shotsMade: 50,
    shotsTaken: 100,
    bestStreak: 9,
    sessionCount: 1,
  },
  {
    userId: 6,
    userName: "Justin Holiday",
    percentage: 48,
    shotsMade: 48,
    shotsTaken: 100,
    bestStreak: 9,
    sessionCount: 1,
  },
  {
    userId: 7,
    userName: "Doug McDermott",
    percentage: 47,
    shotsMade: 47,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 8,
    userName: "T.J. Warren",
    percentage: 45,
    shotsMade: 45,
    shotsTaken: 100,
    bestStreak: 6,
    sessionCount: 1,
  },
  {
    userId: 9,
    userName: "Myles Turner",
    percentage: 42,
    shotsMade: 42,
    shotsTaken: 100,
    bestStreak: 7,
    sessionCount: 1,
  },
  {
    userId: 10,
    userName: "Jeremy Lamb",
    percentage: 42,
    shotsMade: 42,
    shotsTaken: 100,
    bestStreak: 4,
    sessionCount: 1,
  },
  {
    userId: 11,
    userName: "JaKarr Sampson",
    percentage: 41,
    shotsMade: 82,
    shotsTaken: 200,
    bestStreak: 6,
    sessionCount: 1,
  },
  {
    userId: 12,
    userName: "Edmond Sumner",
    percentage: 39,
    shotsMade: 117,
    shotsTaken: 300,
    bestStreak: 11,
    sessionCount: 1,
  },
];
