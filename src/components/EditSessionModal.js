import React from "react";
import { useForm } from "react-hook-form";
import * as styles from "./EditSessionModal.module.css";

export default function EditSessionModal({
  onSave,
  onCancel,
  sessionBeingEdited,
}) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
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
              validate: {
                negative: (v) => parseInt(v) > 0 || "should be greater than 0",
                greaterThanShotsTaken: (v) =>
                  parseInt(v) <= getValues("shotsTaken") ||
                  "should not be greater than shots taken",
              },
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
          disabled={errors.shotsMade || errors.shotsTaken}
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
