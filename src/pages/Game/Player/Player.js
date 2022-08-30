import React from "react";
import classes from "./Player.module.css";
import PlayerFace from "./PlayerFace";
import PlayerHand from "./PlayerHand";

const Player = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <PlayerFace className={classes.face} />
      <PlayerHand className={classes.hand} />
    </div>
  );
};

export default Player;
