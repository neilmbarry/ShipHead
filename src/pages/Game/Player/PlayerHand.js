import React, { useState, useEffect, useMemo } from "react";
import classes from "./PlayerHand.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";
import { generateDeck, checkBurnStack } from "../../../gameLogic/gameLogic";
import {
  cardValues,
  suits,
  powerCards,
  reverseCards,
} from "../../../config/initialCardValues";

const PlayerHand = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [selectedCards, setSelectedCards] = useState([]);

  const selectCardHandler = (name) => {
    setSelectedCards((prev) => {
      if (prev.includes(name)) {
        return prev.filter((card) => card !== name);
      }
      return [...prev, name];
    });
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

  useEffect(() => {
    generateDeck(suits, cardValues, powerCards, reverseCards);
  }, []);

  useEffect(() => {
    console.log("Selected Cards: ", selectedCards);
  }, [selectedCards]);
  return <div className={classesList}>{fullDeck}</div>;
};

export default PlayerHand;
