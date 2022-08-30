import React from "react";
import classes from "./OpponentFaceCards.module.css";
import Card from "../../../components/UI/Card";

const OpponentFaceCards = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.faceUp}>
        <Card className={classes.card} name="AceHearts" />
        <Card className={classes.card} name="10Spades" />
        <Card className={classes.card} name="AceDiamonds" />
      </div>
      <div className={classes.faceDown}>
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
      </div>
    </div>
  );
};

export default OpponentFaceCards;
