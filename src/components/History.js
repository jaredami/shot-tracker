import React from "react";
import { sessions } from "../data/db";
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
