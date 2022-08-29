import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faWarning,
  faBell,
  faCircleInfo,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const notificationIcons = {
  warning: faWarning,
  alert: faBell,
  info: faCircleInfo,
  success: faCheck,
};

const Notification = ({ className, notification, onClose }) => {
  const classesList = `${classes.main} ${
    classes[notification.type]
  } ${className}`;

  const notificationIcon = notificationIcons[notification.type];

  useEffect(() => {
    const autoClose = setTimeout(() => {
      onClose();
    }, 1500);
    return () => clearTimeout(autoClose);
  }, [onClose]);
  return ReactDOM.createPortal(
    <div className={classesList}>
      <div className={classes.notificationIcon}>
        <FontAwesomeIcon icon={notificationIcon} />
      </div>
      <div className={classes.text}>
        <h5>{notification.type}</h5>
        <p>{notification.text}</p>
      </div>
      <div className={classes.closeIcon} onClick={onClose}>
        <FontAwesomeIcon icon={faClose} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Notification;
