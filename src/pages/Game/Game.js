import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allPlayersHaveSetFaceCards,
  playerWithLowestStarter,
} from "../../gameLogic/gameLogic";

import userActions from "../../redux/userSlice";

import classes from "./Game.module.css";

import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Message from "./Message/Message";
import Actions from "./Actions/Actions";
import Opponents from "./Opponent/Opponents";
import GameOver from "./GameOver/GameOver";
import Modal from "../../components/UI/Modal";

import { useSocket } from "../../context/SocketProvider";

import { motion } from "framer-motion";
import { gamePageVariants } from "../../config/animationVariants";
import store from "../../redux/store";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const room = useSelector((state) => state.game.value.room);
  const gameOver = useSelector((state) => state.game.value.gameOver);
  const activePlayer = useSelector((state) => state.game.value.activePlayerId);
  const host = userState.id === gameState.hostId;
  const socket = useSocket();
  const navigate = useNavigate();

  const gameOverModal = gameState.shipHead && (
    <Modal show={true}>
      <GameOver />
    </Modal>
  );

  useEffect(() => {
    if (!userState.id) {
      store.dispatch(
        userActions.setNotification({
          type: "warning",
          message: "You were disconnected",
          duration: 3000,
        })
      );

      return navigate("/");
    }
    if (gameOver || !host) return;
    if (!activePlayer && allPlayersHaveSetFaceCards()) {
      const startingPlayer = playerWithLowestStarter();
      console.log(startingPlayer, room);
      socket.emit("setActivePlayer", {
        player: startingPlayer,
        roomId: room,
      });
    }
  }, [host, room, socket, gameOver, activePlayer, gameState]);

  return (
    <motion.div
      variants={gamePageVariants}
      initial="hidden"
      animate="visible"
      exit={gamePageVariants.exit}
      className={classesList}
    >
      <Opponents className={classes.opponents} />
      <Message className={classes.message} />
      <Deck className={classes.deck} />
      <Stack className={classes.stack} />
      <Actions className={classes.actions} />
      <Player className={classes.player} />
      {gameOverModal}
    </motion.div>
  );
};

export default Game;
