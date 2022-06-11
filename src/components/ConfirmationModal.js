import React from "react";
import "./ConfirmationModal.css";

export default function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal__container">
      <div className="modal">
        <p className="modal__message">{message ? message : "Are you sure?"}</p>
        <button
          className="modal__button modal__button--yes"
          onClick={() => onConfirm()}
        >
          Yes
        </button>
        <button
          className="modal__button modal__button--no"
          onClick={() => onCancel()}
        >
          No
        </button>
      </div>
    </div>
  );
}
