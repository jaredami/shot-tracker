import React from "react";
import { useForm } from "react-hook-form";
import * as styles from "./EditSessionModal.module.css";

export default function EditSessionModal({
  onSave,
  onCancel,
  sessionBeingEdited,
}) {
  const { register } = useForm({
    defaultValues: {
      shotsMade: sessionBeingEdited.shotsMade,
      shotsTaken: sessionBeingEdited.shotsTaken,
    },
  });
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal}>
        <div
          className={`login-form-row ${styles.modal__inputContainer}`}
          id="user-name"
        >
          <label>Shots Made</label>
          <input
            type="number"
            {...register("shotsMade", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div
          className={`login-form-row ${styles.modal__inputContainer}`}
          id="user-name"
        >
          <label>Shots Taken</label>
          <input
            type="number"
            {...register("shotsTaken", {
              valueAsNumber: true,
            })}
          />
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
