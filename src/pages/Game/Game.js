import React from "react";
import classes from "./Game.module.css";
import Opponent from "./Opponent/Opponent";
import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Message from "./Message/Message";
import Actions from "./Actions/Actions";
import Opponents from "./Opponent/Opponents";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
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
