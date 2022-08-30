import React from "react";
import classes from "./Opponent.module.css";

const Opponent = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.face}>face</div>
      <div className={classes.hand}>hand</div>
      <div className={classes.info}>info</div>
    </div>
  );
};

export default Opponent;
