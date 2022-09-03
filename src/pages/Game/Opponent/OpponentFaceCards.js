import React from "react";
import classes from "./OpponentFaceCards.module.css";
import Card from "../../../components/UI/Card";

const OpponentFaceCards = ({ className, faceUpCards, faceDownCards }) => {
  const classesList = `${classes.main} ${className}`;
  const faceUpJSX = faceUpCards.map((card) => (
    <Card className={classes.card} name={card} key={card} />
  ));
  const faceDownJSX = faceDownCards.map((card) => (
    <Card className={classes.card} name={"back"} key={card} />
  ));
  return (
    <div className={classesList}>
      <div className={classes.faceUp}>{faceUpJSX}</div>
      <div className={classes.faceDown}>{faceDownJSX}</div>
    </div>
  );
};

export default OpponentFaceCards;
