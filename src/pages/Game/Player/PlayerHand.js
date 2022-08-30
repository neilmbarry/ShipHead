import React from "react";
import classes from "./PlayerHand.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

const PlayerHand = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const fullDeck = Object.keys(CardImages).map((name, i) => {
    if (i > 8) return null;
    return <Card name={name} className={classes.card} key={name} />;
  });
  return <div className={classesList}>{fullDeck}</div>;
};

export default PlayerHand;
