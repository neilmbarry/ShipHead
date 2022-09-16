import React from "react";
import classes from "./OpponentFaceCards.module.css";
import Card from "../../../components/UI/Card";
import { AnimatePresence } from "framer-motion";
import { getActiveHand } from "../../../gameLogic/gameLogic";

const OpponentFaceCards = ({
  className,
  faceUpCards,
  faceDownCards,
  player,
}) => {
  const inactive = getActiveHand(player?.id) === "handCards" ? "inactive" : "";
  const classesList = `${classes.main} ${className} ${classes[inactive]}`;
  const faceUpJSX = faceUpCards?.map((card) => (
    <Card className={classes.card} name={card} key={card} type="opFace" />
  ));
  const faceDownJSX = faceDownCards?.map((card) => (
    <Card className={classes.card} name={"back"} key={card} type="opFace" />
  ));
  return (
    <div className={classesList}>
      <div className={classes.faceUp}>
        <AnimatePresence>{faceUpJSX}</AnimatePresence>
      </div>
      <div className={classes.faceDown}>
        <AnimatePresence>{faceDownJSX}</AnimatePresence>
      </div>
    </div>
  );
};

export default OpponentFaceCards;
