import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { modalVariants, overlayVariants } from "../../config/animationVariants";

import PlayComputerModal from "../../pages/Home/PlayComputerModal";
import CreateGameModal from "../../pages/Home/CreateGameModal";
import GameOver from "../../pages/Game/GameOver/GameOver";
import JoinGameModal from "../../pages/Home/JoinGameModal";

const Modal = ({ className, onClose, show, type, user }) => {
  const classesList = `${classes.main} ${className}`;
  const modalMap = {
    playComputer: <PlayComputerModal onClose={onClose} />,
    createGame: <CreateGameModal onClose={onClose} />,
    gameOver: <GameOver onClose={onClose} />,
    joinGame: <JoinGameModal onClose={onClose} />,
  };
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
            {modalMap[type]}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
};

export default Modal;
