import React, { useState, useEffect } from "react";
import classes from "./PlayerHand.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

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
    if (i > 33) return null;
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
  const threeRandoms = (
    <>
      <Card
        name="7Diamonds"
        className={classes.card}
        selected={selectedCards.includes("7Diamonds")}
        onClick={selectCardHandler}
      />
      <Card
        name="KingDiamonds"
        className={classes.card}
        selected={selectedCards.includes("KingDiamonds")}
        onClick={selectCardHandler}
      />
      <Card
        name="JackClubs"
        className={classes.card}
        selected={selectedCards.includes("JackClubs")}
        onClick={selectCardHandler}
      />
    </>
  );
  //-------------------DEVELOPMENT-----------------//

  useEffect(() => {
    console.log("Selected Cards: ", selectedCards);
  }, [selectedCards]);
  return <div className={classesList}>{fullDeck}</div>;
};

export default PlayerHand;
