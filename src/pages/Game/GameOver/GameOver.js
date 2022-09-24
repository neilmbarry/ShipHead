import React from "react";
import classes from "./GameOver.module.css";

import Button from "../../../components/UI/Button";
import PlayerInfo from "../../../components/UI/PlayerInfo";

import { useSocket } from "../../../context/SocketProvider";
import { useSelector } from "react-redux";

import { generateDeck } from "../../../gameLogic/gameUtils";

const GameOver = ({ className }) => {
  const socket = useSocket();
  const classesList = `${classes.main} ${className}`;
  const room = useSelector((state) => state.game.value.room);
  const shipHead = useSelector((state) => state.game.value.shipHead);
  const playAgainHandler = () => {
    socket.emit("newGame", {
      room,
      info: generateDeck(),
    });
  };
  return (
    <div className={classesList}>
      <h2>Game Over</h2>
      <PlayerInfo name={shipHead.name} avatar={shipHead.avatar} />
      <h4>is the ShipHead!</h4>
      <Button text="Play Again" onClick={playAgainHandler} />
    </div>
  );
};

export default GameOver;
