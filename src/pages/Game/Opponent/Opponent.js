import React from "react";
import classes from "./Opponent.module.css";
import OpponentInfo from "./OpponentInfo";
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";
import { useSelector } from "react-redux";

const Opponent = ({
  className,
  name,
  playerId,
  avatar,
  faceUpCards,
  faceDownCards,
  handCards,
}) => {
  const activePlayerId = useSelector(
    (state) => state.game.value.activePlayerId
  );
  const active = activePlayerId === playerId ? "active" : "";
  const classesList = `${classes.main} ${className} ${classes[active]}`;
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
