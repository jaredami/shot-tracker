import React from "react";
import * as styles from "./EditSessionModal.module.css";

export default function EditSessionModal({
  onSave,
  onCancel,
  sessionBeingEdited,
}) {
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal}>
        <div
          className={`login-form-row ${styles.modal__inputContainer}`}
          id="user-name"
        >
          <label>Shots Made</label>
          <input type="text" value={sessionBeingEdited.shotsMade} />
        </div>
        <div
          className={`login-form-row ${styles.modal__inputContainer}`}
          id="user-name"
        >
          <label>Shots Taken</label>
          <input type="text" value={sessionBeingEdited.shotsTaken} />
        </div>
        <button
          className={[styles.modal__button, styles.modal__buttonYes].join(" ")}
          onClick={() => onSave()}
        >
          Save
        </button>
        <button
          className={[styles.modal__button, styles.modal__buttonNo].join(" ")}
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
