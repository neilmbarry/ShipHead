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
import { motion } from "framer-motion";
import { notificationVariants } from "../../config/animationVariants";
import { AnimatePresence } from "framer-motion";

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
    }, 2000);
    return () => clearTimeout(autoClose);
  }, [onClose]);
  return ReactDOM.createPortal(
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={notificationVariants}
        initial="hidden"
        animate="visible"
        exit={notificationVariants.exit}
        className={classesList}
      >
        <div className={classes.notificationIcon}>
          <FontAwesomeIcon icon={notificationIcon} />
        </div>
        <div className={classes.text}>
          {/* <h5>{notification.type}</h5> */}
          <p>{notification.message}</p>
        </div>
        <div className={classes.closeIcon} onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("portal")
  );
};

export default Notification;
