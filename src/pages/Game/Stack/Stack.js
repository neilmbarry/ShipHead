import React from "react";
import classes from "./Stack.module.css";
import Card from "../../../components/UI/Card";
import { useSelector } from "react-redux";

const Stack = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const stack = useSelector((state) => state.game.value.stack);

  const stackJSX = stack.map((card, r) => (
    <Card name={card} key={card} r={r} className={classes.card} />
  ));
  return <div className={classesList}>{stackJSX}</div>;
};

export default Stack;
