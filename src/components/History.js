import React, { useEffect, useState } from "react";
import { sessions } from "../mock-data/db";
import * as styles from "./History.module.css";

export default function History() {
  // const [sessions, setSessions] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:8000/sessions")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSessions(data);
  //     });
  // }, []);

  return (
    <div className={styles.historyContainer}>
      {sessions &&
        sessions.map((session) => (
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
