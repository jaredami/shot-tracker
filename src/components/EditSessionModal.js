import React, { useEffect } from "react";
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
    watch,
    formState: { isDirty },
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      shotsMade: sessionBeingEdited.shotsMade,
      shotsTaken: sessionBeingEdited.shotsTaken,
      bestStreak: sessionBeingEdited.bestStreak,
    },
  });

  const watchShotsMade = watch("shotsMade");
  const watchShotsTaken = watch("shotsTaken");
  const watchBestStreak = watch("bestStreak");

  // each input's validation ony triggers automatically when its value changes, but we
  // need it to trigger on updates to the other inputs as well.
  useEffect(() => {
    trigger(["shotsMade", "shotsTaken", "bestStreak"]);
  }, [watchShotsMade, watchShotsTaken, watchBestStreak, trigger]);

  return (
    <div className={styles.modal__container}>
      {/* {console.log("errors", errors)} */}
      <div className={styles.modal}>
        <div className={styles.modal__inputContainer}>
          <label>Shots Made</label>
          <input
            className={errors.shotsMade && styles.invalidInput}
            type="number"
            {...register("shotsMade", {
              valueAsNumber: true,
              validate: {
                negative: (v) =>
                  parseInt(v) >= 0 || "Shots Made must be at least 0.",
                greaterThanShotsTaken: (v) =>
                  parseInt(v) <= getValues("shotsTaken") ||
                  "Shots Made cannot be greater than shots taken.",
              },
            })}
          />
        </div>
        {errors.shotsMade && (
          <span className={styles.invalidInputMessage}>
            {errors.shotsMade.message}
          </span>
        )}
        <div className={styles.modal__inputContainer}>
          <label>Shots Taken</label>
          <input
            className={errors.shotsTaken && styles.invalidInput}
            type="number"
            {...register("shotsTaken", {
              valueAsNumber: true,
              validate: {
                negative: (v) =>
                  parseInt(v) > 0 || "Shots Taken must be greater than 0.",
                lessThanShotsMade: (v) =>
                  parseInt(v) >= getValues("shotsMade") ||
                  "Shots Taken cannot be less than shots made.",
              },
            })}
          />
        </div>
        {errors.shotsTaken && (
          <span className={styles.invalidInputMessage}>
            {errors.shotsTaken.message}
          </span>
        )}
        <div className={styles.modal__inputContainer}>
          <label>Best Streak</label>
          <input
            className={errors.bestStreak && styles.invalidInput}
            type="number"
            {...register("bestStreak", {
              valueAsNumber: true,
              validate: {
                negative: (v) =>
                  parseInt(v) >= 0 || "Best Streak must be at least 0.",
                greaterThanShotsMade: (v) =>
                  parseInt(v) <= getValues("shotsMade") ||
                  "Best Streak cannot be greater than shots made.",
              },
            })}
          />
        </div>
        {errors.bestStreak && (
          <span className={styles.invalidInputMessage}>
            {errors.bestStreak.message}
          </span>
        )}
        <div className={styles.modal__buttonsContainer}>
          <button
            className={[styles.modal__button, styles.modal__buttonYes].join(
              " "
            )}
            onClick={() => onSave(getValues())}
            disabled={!isDirty || Object.keys(errors).length}
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
    </div>
  );
}
