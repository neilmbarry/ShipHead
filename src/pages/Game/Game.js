import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { generateDeck, shuffleDeck } from "../../gameLogic/gameUtils";

import classes from "./Game.module.css";

import Player from "./Player/Player";
import Deck from "./Deck/Deck";
import Stack from "./Stack/Stack";
import Message from "./Message/Message";
import Actions from "./Actions/Actions";
import Opponents from "./Opponent/Opponents";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const host = userState.id === gameState.hostId;

  useEffect(() => {
    if (gameState.gameOver || !host) return;
    // Deal cards
    // (Players set Face Cards)
    // Check all players have set FaceUp cards
    // Set Computer Face Cards?
    // Decide who has lowest starting hand
    // (play begins)
    // (Plyaer makes a move)
    // Check legal move
    // Check Burn
    // Check draw cards
    // Check winner
    // Check SHIPHEAD
    // Check reverse
    // Switch Player
    //
    //-----REGULAR PLAY------//
    const toBeEmitted = [];
    const newDeck = shuffleDeck(generateDeck()[0]);
    toBeEmitted.push("setDeck", newDeck);
    toBeEmitted.push("dealCards");
  }, [host, gameState]);

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
