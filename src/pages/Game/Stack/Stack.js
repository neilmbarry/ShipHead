import React from "react";
import classes from "./Stack.module.css";
import Card from "../../../components/UI/Card";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

const Stack = ({ className, template }) => {
  const classesList = `${classes.main} ${className}`;
  const stack = useSelector((state) => state.game.value.stack);

  const stackTemplateJSX = template?.map((card, r) => (
    <Card name={card} key={card} r={r} className={classes.card} type="stack" />
  ));

  const stackJSX = stack.map((card, r) => (
    <Card name={card} key={card} r={r} className={classes.card} type="stack" />
  ));
  return (
    <div className={classesList}>
      <AnimatePresence>{stackTemplateJSX || stackJSX}</AnimatePresence>
    </div>
  );
};

export default Stack;
