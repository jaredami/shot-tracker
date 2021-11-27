import React, { useEffect, useState } from "react";
import * as styles from "./Toast.module.css";

export default function Toast({ message, type }) {
  const [isDisplayed, setIsDisplayed] = useState(true);

  useEffect(() => {
    const dismissTime = 4000;
    const interval = setInterval(() => {
      setIsDisplayed(false);
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    isDisplayed && (
      <div
        className={`${styles.toast} ${type === "error" && styles.toastError}`}
      >
        {message}
      </div>
    )
  );
}
