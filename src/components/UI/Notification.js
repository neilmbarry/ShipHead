import React from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faWarning } from "@fortawesome/free-solid-svg-icons";

const Notification = ({ className, notification, onClose }) => {
  const classesList = `${classes.main} ${
    classes[notification.type]
  } ${className}`;
  return ReactDOM.createPortal(
    <div className={classesList}>
      <div className={classes.notificationIcon}>
        <FontAwesomeIcon icon={faWarning} />
      </div>
      <div className={classes.text}>
        <h5>Notification</h5>
        <p>You must first enter a valid name</p>
      </div>
      <div className={classes.closeIcon} onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Notification;
