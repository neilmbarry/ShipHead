import React from "react";
import classes from "./OpponentHandCards.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

const OpponentHandCards = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const fullDeck = Object.keys(CardImages).map((name, i) => {
    if (i > 2) return null;
    if (i > 5) return null;
    if (i > 12) return null;
    if (i > 25) return null;
    if (i > 32) return null;
    if (i > 42) return null;
    return <Card name="back" className={classes.card} key={name} />;
  });
  return (
    <div className={classesList}>
      <div className={classes.cardContainer}>{fullDeck}</div>
    </div>
  );
};

export default OpponentHandCards;
