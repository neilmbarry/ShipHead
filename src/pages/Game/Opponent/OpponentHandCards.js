import React from "react";
import classes from "./OpponentHandCards.module.css";
import Card from "../../../components/UI/Card";

const OpponentHandCards = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.cardContainer}>
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        {/* <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />

        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" /> */}
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
        <Card className={classes.card} name="back" /> */}

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
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" />
        <Card className={classes.card} name="back" /> */}
      </div>
    </div>
  );
};

export default OpponentHandCards;
