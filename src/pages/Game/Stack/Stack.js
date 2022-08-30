import React from "react";
import classes from "./Stack.module.css";
import Card from "../../../components/UI/Card";
import cards from "../../../utils/CardImages";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Card name="AceSpades" className={classes.card} />
    </div>
  );
};

export default Stack;
