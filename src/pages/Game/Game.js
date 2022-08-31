import React from "react";
import classes from "./Game.module.css";
import Button from "../../components/UI/Button";
import Opponent from "./Opponent/Opponent";
import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import { Link } from "react-router-dom";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Player className={classes.player1} />
      <Opponent className={classes.player2} />
      <Opponent className={classes.player3} />
      <Opponent className={classes.player4} />
      <div className={classes.actions}>
        <Button text="Play" />
        <Button text="take" />
        <Button text="sort" />
        <Link to="/">
          <Button text="exit" />
        </Link>
      </div>
      <Stack className={classes.stack} />
      <Deck className={classes.deck} />

      <div className={classes.message}>
        <h4>Neil has played an ace!</h4>
        <h4>so suck it!!</h4>
      </div>
    </div>
  );
};

export default Game;
