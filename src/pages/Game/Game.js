import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  allPlayersHaveSetFaceCards,
  playerWithLowestStarter,
  setBotFaceCards,
} from "../../gameLogic/gameLogic";

import classes from "./Game.module.css";

import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Message from "./Message/Message";
import Actions from "./Actions/Actions";
import Opponents from "./Opponent/Opponents";
import { useSocket } from "../../context/SocketProvider";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const host = userState.id === gameState.hostId;
  const socket = useSocket();

  // setTimeout(() => {
  //   setBotFaceCards(socket);
  // }, 3000);

  useEffect(() => {
    if (gameState.gameOver || !host) return;
    console.log("running");
    if (!allPlayersHaveSetFaceCards()) {
      setTimeout(() => {
        setBotFaceCards(socket);
      }, 500);
    }

    if (!gameState.activePlayerId && allPlayersHaveSetFaceCards()) {
      const startingPlayer = playerWithLowestStarter();
      socket.emit("setActivePlayer", {
        player: startingPlayer,
        roomId: gameState.room,
      });
    }

    if (
      gameState.players.find((player) => player.id === gameState.activePlayerId)
        .bot
    ) {
      setTimeout(() => {}, 1000);
    }
  }, [host, gameState, socket]);

  return (
    <div className={classesList}>
      <Opponents className={classes.opponents} />
      <Message className={classes.message} />
      <Deck className={classes.deck} />
      <Stack className={classes.stack} />
      <Actions className={classes.actions} />
      <Player className={classes.player} />
    </div>
  );
};

export default Game;
