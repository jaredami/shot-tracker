import React from "react";
import "./Modal.css";

export default function Modal() {
  return (
    <div className="modal__container">
      <p className="modal__message">Message</p>
      <button className="modal__button modal__button--yes">Yes</button>
      <button className="modal__button modal__button--no">No</button>
    </div>
  );
}
