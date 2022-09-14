import React from "react";
import classes from "./GameOver.module.css";

import Button from "../../../components/UI/Button";

import { useSocket } from "../../../context/SocketProvider";
import { useSelector } from "react-redux";

import { generateDeck } from "../../../gameLogic/gameUtils";

const GameOver = ({ className }) => {
  const socket = useSocket();
  const classesList = `${classes.main} ${className}`;
  const room = useSelector((state) => state.game.value.room);
  const playAgainHandler = () => {
    socket.emit("newGame", {
      room,
      info: generateDeck(),
    });
  };
  return (
    <div className={classesList}>
      <h3>Game Over</h3>
      <Button text="Play Again" onClick={playAgainHandler} />
    </div>
  );
};

export default GameOver;
