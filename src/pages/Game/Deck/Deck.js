import React from "react";
import classes from "./Deck.module.css";
import Card from "../../../components/UI/Card";

import { useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const deck = useSelector((state) => state.game.value.deck);

  const deckJSX = deck
    .map((name, i) => {
      return (
        <Card
          name="back"
          className={classes.card}
          key={name}
          type="deck"
          deckIndex={i}
        />
      );
    })
    .reverse();

  return (
    <div className={classesList}>
      <AnimatePresence>{deckJSX}</AnimatePresence>
    </div>
  );
};

export default Deck;
