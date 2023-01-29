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
import ConnectingModal from "./ConnectingModal";
import store from "../../redux/store";
import userActions from "../../redux/userSlice";
import { useSelector } from "react-redux";

const Modal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const closeModal = () => store.dispatch(userActions.setModal(null));
  const modal = useSelector((state) => state.user.value.modal);

  const modalMap = {
    playComputer: (
      <PlayComputerModal onClose={closeModal} onPlayComputer={null} />
    ),
    createGame: <CreateGameModal onClose={closeModal} />,
    gameOver: <GameOver onClose={closeModal} />,
    joinGame: <JoinGameModal onClose={closeModal} />,
    connecting: <ConnectingModal onClose={null} />,
  };

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {modal && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit={overlayVariants.exit}
            className={classes.overlay}
            onClick={closeModal}
          ></motion.div>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit={modalVariants.exit}
            className={classesList}
          >
            {modalMap[modal?.type]}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
};

export default Modal;
