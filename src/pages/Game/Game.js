import React from "react";
import classes from "./Game.module.css";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>Game</div>;
};

export default Game;
