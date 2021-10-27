import { useEffect, useState } from "react";
import { db } from "../firebase";
import LoadingIndicator from "./LoadingIndicator";
import * as styles from "./Rankings.module.css";

export default function Rankings() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentStat, setCurrentStat] = useState({
    label: "Percentage",
    value: "totalPercentage",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const usersData = await db
        .collection("users")
        .where("totalSessions", ">", 0)
        .get();
      usersData.forEach((doc) => {
        setUsers((users) => [...users, doc.data()]);
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

  function getRankings(stat) {
    return users.sort((a, b) => (a[stat] < b[stat] ? 1 : -1));
  }

  return (
    <>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={() => toggleDropdown()}>
          {currentStat.label} <i className="fa fa-caret-down"></i>
        </button>
        <div
          className={`${styles.dropdownContent} ${
            isDropdownExpanded ? styles.visible : ""
          }`}
        >
          <div
            onClick={() =>
              handleStatSelected({
                label: "Percentage",
                value: "totalPercentage",
              })
            }
          >
            Percentage
          </div>
          <div
            onClick={() =>
              handleStatSelected({
                label: "Shots Made",
                value: "totalShotsMade",
              })
            }
          >
            Shots Made
          </div>
          <div
            onClick={() =>
              handleStatSelected({
                label: "Shots Taken",
                value: "totalShotsTaken",
              })
            }
          >
            Shots Taken
          </div>
          <div
            onClick={() =>
              handleStatSelected({
                label: "Best Streak",
                value: "bestStreakEver",
              })
            }
          >
            Best Streak
          </div>
          <div
            onClick={() =>
              handleStatSelected({
                label: "Sessions",
                value: "totalSessions",
              })
            }
          >
            Sessions
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className={styles.rankingsContainer}>
          {getRankings(currentStat.value).map((user, index) => {
            return (
              <div key={index} className={styles.userCard}>
                <div className={styles.rank}>{index + 1}</div>
                <div className={styles.userInfoContainer}>
                  <div className={styles.userPicContainer}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>{user.userName}</div>
                  <div>{user[currentStat.value]}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
