import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Modal = ({ className, children, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} onClick={onClose}></div>
      <div className={classesList}>{children}</div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
