import React from "react";
import "./EditSessionModal.css";

export default function EditSessionModal({
  shotsMade,
  shotsTaken,
  onSave,
  onCancel,
}) {
  return (
    <div className="modal__container">
      <div className="modal">
        <p className="modal__message">edit session placeholder...</p>
        <button
          className="modal__button modal__button--yes"
          onClick={() => onSave()}
        >
          Save
        </button>
        <button
          className="modal__button modal__button--no"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
