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
import store from "../../redux/store";
import userActions from "../../redux/userSlice";
import { useSelector } from "react-redux";

const notificationIcons = {
  warning: faWarning,
  alert: faBell,
  info: faCircleInfo,
  success: faCheck,
};

const Notification = ({ className }) => {
  const notification = useSelector((state) => state.user.value.notification);

  const classesList = `${classes.main} ${
    classes[notification?.type]
  } ${className}`;

  const closeNotification = () =>
    store.dispatch(userActions.setNotification(null));

  const notificationIcon = notificationIcons[notification?.type];

  useEffect(() => {
    const autoClose = setTimeout(() => {
      console.log();
      closeNotification();
    }, notification?.duration || 1000);
    return () => clearTimeout(autoClose);
  }, [notification]);
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {notification && (
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
            <p>{notification?.message}</p>
          </div>
          <div className={classes.closeIcon} onClick={closeNotification}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
};

export default Notification;
