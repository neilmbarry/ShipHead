import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  allPlayersHaveSetFaceCards,
  playerWithLowestStarter,
} from "../../gameLogic/gameLogic";

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

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const room = useSelector((state) => state.game.value.room);
  const gameOver = useSelector((state) => state.game.value.gameOver);
  const activePlayer = useSelector((state) => state.game.value.activePlayerId);
  const host = userState.id === gameState.hostId;
  const socket = useSocket();

  const gameOverModal = gameState.shipHead && (
    <Modal>
      <GameOver />
    </Modal>
  );

  useEffect(() => {
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
    <div className={classesList}>
      <Opponents className={classes.opponents} />
      <Message className={classes.message} />
      <Deck className={classes.deck} />
      <Stack className={classes.stack} />
      <Actions className={classes.actions} />
      <Player className={classes.player} />
      {gameOverModal}
    </div>
  );
};

export default Game;
