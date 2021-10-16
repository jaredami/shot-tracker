import React, { useState } from "react";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndicator";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [currentStat, setCurrentStat] = useState({
    label: "Percentage",
    value: "percentage",
  });
  const [usersDataMap, setUsersDataMap] = useState(new Map());
  function updateUsersDataMap(k, v) {
    setUsersDataMap(new Map(usersDataMap.set(k, v)));
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const sessionsData = [];
      const data = await db.collection("sessions").get();
      data.forEach((doc) => sessionsData.push(doc.data()));

      sessionsData.forEach((session) => {
        const userId = session.userId;
        const userEntry = usersDataMap.get(session.userId);
        if (!userEntry)
          return updateUsersDataMap(session.userId, {
            shotsMade: session.shotsMade,
            shotsTaken: session.shotsTaken,
            bestStreak: session.bestStreak,
            percentage: Math.floor(
              (session.shotsMade / session.shotsTaken) * 100
            ),
          });

        const shotsMade = userEntry.shotsMade + session.shotsMade;
        const shotsTaken = userEntry.shotsTaken + session.shotsTaken;
        const bestStreak =
          session.bestStreak > userEntry.bestStreak
            ? session.bestStreak
            : userEntry.bestStreak;
        const percentage = Math.floor((shotsMade / shotsTaken) * 100);
        updateUsersDataMap(userId, {
          ...userEntry,
          shotsMade,
          shotsTaken,
          bestStreak,
          percentage,
        });
      });
      console.log("usersDataMap", usersDataMap);

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

  function getRankings(stat) {
    const sortedMap = new Map(
      [...usersDataMap.entries()].sort((a, b) => b[1][stat] - a[1][stat])
    );
    return Array.from(sortedMap);
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
          {getRankings(currentStat).map((user, index) => {
            return (
              <div key={user[0]} className={styles.userCard}>
                <div className={styles.rank}>{index + 1}</div>
                <div className={styles.userInfoContainer}>
                  <div className={styles.userPicContainer}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>{user[0]}</div>
                  <div>{user[1][currentStat.value]}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
