import React from "react";
import classes from "./PlayerFaceCards.module.css";
import Card from "../../../components/UI/Card";

const PlayerFace = ({ className, faceUpCards, faceDownCards }) => {
  const classesList = `${classes.main} ${className}`;
  const faceUpJSX = faceUpCards.map((card) => {
    return <Card className={classes.card} name={card} key={card} />;
  });
  const faceDownJSX = faceDownCards.map((card) => {
    return <Card className={classes.card} name={"back"} key={card} />;
  });
  return (
    <div className={classesList}>
      <div className={classes.faceUp}>{faceUpJSX}</div>
      <div className={classes.faceDown}>{faceDownJSX}</div>
    </div>
  );
};

export default PlayerFace;
