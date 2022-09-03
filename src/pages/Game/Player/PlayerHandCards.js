import React, { useState, useEffect, useMemo } from "react";
import classes from "./PlayerHandCards.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";
// import { generateDeck, checkBurnStack } from "../../../gameLogic/gameUtils";
import store from "../../../redux/store";
import { setSelecteCards } from "../../../redux/userSlice";
import {
  cardValues,
  suits,
  powerCards,
  reverseCards,
} from "../../../config/initialCardValues";
import { useSelector } from "react-redux";

const PlayerHand = ({ className, handCards }) => {
  const classesList = `${classes.main} ${className}`;
  const selectedCards = useSelector((state) => state.user.value.selectedCards);

  const selectCardHandler = (name) => {
    if (selectedCards.includes(name)) {
      return store.dispatch(
        setSelecteCards(selectedCards.filter((card) => card !== name))
      );
    }
    return store.dispatch(setSelecteCards([...selectedCards, name]));
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
