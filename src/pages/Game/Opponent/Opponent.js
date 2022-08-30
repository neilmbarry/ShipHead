import React from "react";
import classes from "./Opponent.module.css";
import OpponentInfo from "./OpponentInfo";
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";

const Opponent = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <OpponentFaceCards className={classes.face} />
      <OpponentHandCards className={classes.hand} />
      <OpponentInfo className={classes.info} />
    </div>
  );
};

export default Opponent;
