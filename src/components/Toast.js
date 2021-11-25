import React from "react";
import * as styles from "./Toast.module.css";

export default function Toast({ message }) {
  return <div className={styles.toastContainer}>{message}</div>;
}
