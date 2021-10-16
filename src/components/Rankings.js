import React, { useState } from "react";
import { db } from "../firebase";
import { playerData } from "../mock-data/db";
import LoadingIndicator from "./LoadingIndicator";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [currentStat, setCurrentStat] = useState({
    label: "Percentage",
    value: "percentage",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await db
        .collection("sessions")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("doc.data()", doc.data());
          });
        });

      setIsLoading(false);
    };
    fetchData();
  }, []);

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
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <div className={styles.rankingsContainer}>
          {playerData
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
      )}
    </>
  );
}
