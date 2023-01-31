// Main imports
import React from "react";

// Styles
import classes from "./Player.module.css";

// Components
import PlayerFaceCards from "./PlayerFaceCards";
import PlayerHandCards from "./PlayerHandCards";
import PlayerInfo from "../../../components/UI/PlayerInfo";

// State management
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

  // Add styling for currently active player or no active player (before the game begins)
  const active = activePlayerId === userId || !activePlayerId ? "active" : "";

  const classesList = `${classes.main} ${className} ${classes[active]}`;
  const activeHand = getActiveHand(userId);
  return (
    <div className={classesList}>
      {
        // The game state is passed down to the children through props.
      }
      <PlayerInfo
        className={classes.info}
        name={player?.name}
        avatar={player?.avatar}
        active={active}
      />
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
