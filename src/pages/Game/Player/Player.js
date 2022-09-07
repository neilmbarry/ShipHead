import React from "react";
import classes from "./Player.module.css";
import PlayerFaceCards from "./PlayerFaceCards";
import PlayerHandCards from "./PlayerHandCards";
import store from "../../../redux/store";
import { useSelector } from "react-redux";

const Player = ({ className }) => {
  const userId = useSelector((state) => state.user.value.id);
  const player = useSelector((state) => state.game.value.players).find(
    (player) => player.id === userId
  );
  const activePlayerId = useSelector(
    (state) => state.game.value.activePlayerId
  );
  const active = activePlayerId === userId ? "active" : "";
  const classesList = `${classes.main} ${className} ${classes[active]}`;
  return (
    <div className={classesList}>
      <PlayerFaceCards
        faceUpCards={player?.faceUpCards}
        faceDownCards={player?.faceDownCards}
        className={classes.face}
      />
      <PlayerHandCards handCards={player?.handCards} className={classes.hand} />
    </div>
  );
};

export default Player;
