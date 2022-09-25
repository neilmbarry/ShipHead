import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { modalVariants, overlayVariants } from "../../config/animationVariants";

const Modal = ({ className, children, onClose, show }) => {
  const classesList = `${classes.main} ${className}`;
  return ReactDOM.createPortal(
    <AnimatePresence exitBeforeEnter>
      {show && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit={overlayVariants.exit}
            className={classes.overlay}
            onClick={onClose}
          ></motion.div>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit={modalVariants.exit}
            className={classesList}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
};

export default Modal;
