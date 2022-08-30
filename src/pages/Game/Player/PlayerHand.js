import React from "react";
import classes from "./PlayerHand.module.css";
import Card from "../../../components/UI/Card";
import CardImages from "../../../utils/CardImages";

const PlayerHand = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const fullDeck = Object.keys(CardImages).map((name) => (
    <Card name={name} className={classes.card} key={name} />
  ));
  return (
    <div className={classesList}>
      {fullDeck}
      <Card name="3Diamonds" className={classes.card} />
    </div>
  );
};

export default PlayerHand;
