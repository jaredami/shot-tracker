import React from "react";
import "./EditSessionModal.css";

export default function EditSessionModal({
  onSave,
  onCancel,
  sessionBeingEdited,
}) {
  return (
    <div className="modal__container">
      <div className="modal">
        <p className="modal__message">{sessionBeingEdited?.id}</p>
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
