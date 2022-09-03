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
      <Player className={classes.player} />
      <Opponents className={classes.opponents} />
      {/* <Opponent className={classes.opponent1} />
      <Opponent className={classes.opponent2} />
      <Opponent className={classes.opponent3} /> */}
      <Actions className={classes.actions} />
      <Stack className={classes.stack} />
      <Deck className={classes.deck} />
      <Message
        gameEvent="Neil has played an ace!"
        gameAnnouncement={"so suck it!"}
        className={classes.message}
      />
    </div>
  );
};

export default Game;
