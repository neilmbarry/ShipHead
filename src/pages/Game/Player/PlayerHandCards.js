import React, { useState, useEffect, useMemo } from "react";
import classes from "./PlayerHandCards.module.css";
import Card from "../../../components/UI/Card";
import { AnimatePresence } from "framer-motion";

import store from "../../../redux/store";
import userActions from "../../../redux/userSlice";
import { useSelector } from "react-redux";

const PlayerHand = ({ className, handCards, player, activeHand }) => {
  const hide = activeHand !== "handCards" ? "hide" : "";
  const classesList = `${classes.main} ${className} ${classes[hide]}`;
  const selectedCards = useSelector((state) => state.user.value.selectedCards);

  const deckRef = useSelector((state) => state.game.value.deckRef);

  const selectCardHandler = (name) => {
    if (selectedCards.includes(name)) {
      return store.dispatch(
        userActions.setSelectedCards(
          selectedCards.filter((card) => card !== name)
        )
      );
    }
    if (!player.hasSetFaceUpCards) {
      if (selectedCards.length === 3) {
        return store.dispatch(
          userActions.setSelectedCards([...selectedCards.slice(1, 3), name])
        );
      }
    }

    if (player.hasSetFaceUpCards) {
      if (
        selectedCards.length > 0 &&
        deckRef[name].worth !== deckRef[selectedCards[0]].worth
      ) {
        return store.dispatch(userActions.setSelectedCards([name]));
      }
    }

    return store.dispatch(
      userActions.setSelectedCards([...selectedCards, name])
    );
  };

  const handCardsJSX = handCards?.map((card, i) => (
    <Card
      name={card}
      className={classes.card}
      key={card}
      z={i}
      type="hand"
      selected={selectedCards.includes(card)}
      onClick={() => selectCardHandler(card)}
    />
  ));

  return (
    <div className={classesList}>
      <AnimatePresence layout>{handCardsJSX}</AnimatePresence>
    </div>
  );
};

export default PlayerHand;
