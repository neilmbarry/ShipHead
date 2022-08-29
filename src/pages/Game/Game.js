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
      <div className={classes.actions}></div>
      <div className={classes.stack}></div>
      <div className={classes.deck}></div>
      <div className={classes.message}></div>
    </div>
  );
};

export default Game;
