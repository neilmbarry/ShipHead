import React from "react";
import classes from "./Player.module.css";
import PlayerFaceCards from "./PlayerFaceCards";
import PlayerHandCards from "./PlayerHandCards";
import store from "../../../redux/store";
import { useSelector } from "react-redux";
import { getActiveHand } from "../../../gameLogic/gameLogic";

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
  const activeHand = getActiveHand(userId);
  return (
    <div className={classesList}>
      <PlayerFaceCards
        faceUpCards={player?.faceUpCards}
        faceDownCards={player?.faceDownCards}
        className={classes.face}
        player={player}
        activeHand={activeHand}
      />
      <PlayerHandCards
        player={player}
        handCards={player?.handCards}
        className={classes.hand}
        activeHand={activeHand}
      />
    </div>
  );
};

export default Player;
