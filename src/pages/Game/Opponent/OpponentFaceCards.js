import React from "react";
import classes from "./OpponentFaceCards.module.css";
import Card from "../../../components/UI/Card";

const OpponentFaceCards = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Card className={classes.card} name="AceHearts" />
      <Card className={classes.card} name="AceSpades" />
      <Card className={classes.card} name="AceDiamonds" />
    </div>
  );
};

export default OpponentFaceCards;
