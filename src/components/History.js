import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { calcPercentage } from "../util/utils";
import * as styles from "./History.module.css";
import LoadingIndicator from "./LoadingIndicator";

export default function History() {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await db
        .collection("sessions")
        .where("userId", "==", currentUser.uid)
        .orderBy("timestamp", "desc")
        .get();

      setIsLoading(false);

      const sessionsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSessions(
        sessionsData.map((session) => {
          return {
            ...session,
            date: session.timestamp.toDate().toDateString(),
            percentage: calcPercentage(session.shotsMade, session.shotsTaken),
          };
        })
      );
    };
    fetchData();
  }, [currentUser.uid]);

  return (
    <div className={styles.historyContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : sessions ? (
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
                <div className={styles.stat}>{session.shotsTaken}</div>
                <div className={styles.statLabel}>Shots Taken</div>
              </div>
              <div className={styles.statContainer}>
                <div className={styles.stat}>{session.bestStreak}</div>
                <div className={styles.statLabel}>Best Streak</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Sessions Logged</div>
      )}
    </div>
  );
}
