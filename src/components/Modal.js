import React from "react";
import "./Modal.css";

export default function Modal({ message }) {
  return (
    <div className="modal__container">
      <p className="modal__message">{message ? message : "Are you sure?"}</p>
      <button className="modal__button modal__button--yes">Yes</button>
      <button className="modal__button modal__button--no">No</button>
    </div>
  );
}
