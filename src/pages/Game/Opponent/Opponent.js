import React from "react";
import classes from "./Opponent.module.css";
import OpponentInfo from "./OpponentInfo";
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";

const Opponent = ({
  className,
  name,
  playerId,
  avatar,
  faceUpCards,
  faceDownCards,
  handCards,
}) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <OpponentFaceCards
        faceUpCards={faceUpCards}
        faceDownCards={faceDownCards}
        className={classes.face}
      />
      <OpponentHandCards handCards={handCards} className={classes.hand} />
      <OpponentInfo name={name} avatar={avatar} className={classes.info} />
    </div>
  );
};

export default Opponent;
