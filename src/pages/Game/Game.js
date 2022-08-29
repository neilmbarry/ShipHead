import React from "react";
import classes from "./Game.module.css";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.player1}></div>
      <div className={classes.player2}></div>
      <div className={classes.player3}></div>
      <div className={classes.player4}></div>
      <div className={classes.center}></div>
    </div>
  );
};

export default Game;
