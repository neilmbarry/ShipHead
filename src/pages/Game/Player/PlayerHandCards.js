import React, { useState, useEffect, useMemo } from "react";
import classes from "./PlayerHandCards.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

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
        userActions.setSelecteCards(
          selectedCards.filter((card) => card !== name)
        )
      );
    }
    if (!player.hasSetFaceUpCards) {
      if (selectedCards.length === 3) {
        return store.dispatch(
          userActions.setSelecteCards([...selectedCards.slice(1, 3), name])
        );
      }
    }

    if (player.hasSetFaceUpCards) {
      if (
        selectedCards.length > 0 &&
        deckRef[name].worth !== deckRef[selectedCards[0]].worth
      ) {
        return store.dispatch(userActions.setSelecteCards([name]));
      }
    }

    return store.dispatch(
      userActions.setSelecteCards([...selectedCards, name])
    );
  };

  //-------------------DEVELOPMENT-----------------//
  const fullDeck = Object.keys(CardImages).map((name, i) => {
    if (i > 2) return null;
    // if (i > 8) return null;
    // if (i > 16) return null;
    // if (i > 34) return null;
    // if (i > 44) return null;
    return (
      <Card
        name={name}
        className={classes.card}
        key={name}
        z={i}
        selected={selectedCards.includes(name)}
        onClick={() => selectCardHandler(name)}
      />
    );
  });

  //-------------------DEVELOPMENT-----------------//

  const handCardsJSX = handCards?.map((card, i) => (
    <Card
      name={card}
      className={classes.card}
      key={card}
      z={i}
      selected={selectedCards.includes(card)}
      onClick={() => selectCardHandler(card)}
    />
  ));

  useEffect(() => {
    // generateDeck(suits, cardValues, powerCards, reverseCards);
  }, []);

  return <div className={classesList}>{handCardsJSX}</div>;
};

export default PlayerHand;
