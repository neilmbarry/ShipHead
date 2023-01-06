// Main Imports
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Game Logic
import {
  allPlayersHaveSetFaceCards,
  playerWithLowestStarter,
} from "../../gameLogic/gameLogic";

// Styles
import classes from "./Game.module.css";
import { motion } from "framer-motion";
import { gamePageVariants } from "../../config/animationVariants";

// Components
import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Message from "./Message/Message";
import Actions from "./Actions/Actions";
import Opponents from "./Opponent/Opponents";

// Context
import { useSocket } from "../../context/SocketProvider";
import store from "../../redux/store";
import userActions from "../../redux/userSlice";

const Game = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const room = useSelector((state) => state.game.value.room);
  const gameOver = useSelector((state) => state.game.value.gameOver);
  const activePlayer = useSelector((state) => state.game.value.activePlayerId);

  const host = userState.id === gameState.hostId;

  useEffect(() => {
    if (gameState.shipHead) {
      store.dispatch(
        userActions.setModal({
          type: "gameOver",
        })
      );
    }
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
  }, [
    host,
    room,
    socket,
    gameOver,
    activePlayer,
    gameState,
    userState.id,
    navigate,
  ]);

  return (
    <motion.div
      variants={gamePageVariants}
      initial="hidden"
      animate="visible"
      exit={gamePageVariants.exit}
      className={classes.main}
    >
      <Opponents className={classes.opponents} />
      <Message className={classes.message} />
      <Deck className={classes.deck} />
      <Stack className={classes.stack} />
      <Actions className={classes.actions} />
      <Player className={classes.player} />
    </motion.div>
  );
};

export default Game;
