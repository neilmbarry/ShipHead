import React from "react";
import classes from "./Deck.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

const Deck = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const fullDeck = Object.keys(CardImages).map((name, i) => {
    if (i > 24) return null;
    return (
      <Card
        name="back"
        className={classes.card}
        key={name}
        style={{
          transform: `translate(${-i / 2 + 0}%, -${i / 2 + 50}%)`,
        }}
      />
    );
  });
  return <div className={classesList}>{fullDeck}</div>;
};

export default Deck;
