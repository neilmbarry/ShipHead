import React from "react";
import classes from "./OpponentHandCards.module.css";
import Card from "../../../components/UI/Card";

const OpponentHandCards = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      {/* <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" /> */}
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
      <Card className={classes.card} name="back" />
    </div>
  );
};

export default OpponentHandCards;
