// Main imports
import React, { useEffect } from "react";
import classes from "./Opponent.module.css";

// Components
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";
import PlayerInfo from "../../../components/UI/PlayerInfo";

// State Management
import { useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import {
  playValidMove,
  autoSelectFaceCards,
} from "../../../gameLogic/gameLogic";

const Opponent = ({
  className,
  name,
  playerId,
  avatar,
  faceUpCards,
  faceDownCards,
  handCards,
  bot,
  hasSetFaceCards,
  room,
  opKey,
  player,
}) => {
  const activePlayerId = useSelector(
    (state) => state.game.value.activePlayerId
  );
  const stack = useSelector((state) => state.game.value.stack);
  const gameOver = useSelector((state) => state.game.value.gameOver);
  const active = activePlayerId === playerId ? "active" : "";

  const classesList = `${classes.main} ${className} ${classes[active]}`;
  const socket = useSocket();

  useEffect(() => {
    // This useEffect will run if the opponent is a bot and has not set its face up cards. It will automatically select the best 3.
    if (gameOver) return;
    if (!bot) return;
    if (hasSetFaceCards) return;
    if (handCards.length === 0) return;
    const setFaceCards = setTimeout(() => {
      autoSelectFaceCards(socket, player);
    }, 1000);
    return () => {
      clearTimeout(setFaceCards);
    };
  }, [bot, hasSetFaceCards, socket, room, player, handCards, gameOver]);

  useEffect(() => {
    // This useEffect will run if the opponent is a bot and is the active player. It will play the lowest value card(s) possible with a delay to imitate a human player
    if (gameOver) return;
    if (!active) return;
    if (!bot) return;

    const computerValidMove = setTimeout(() => {
      playValidMove(socket, player);
    }, 2000);

    return () => {
      clearTimeout(computerValidMove);
    };
  }, [active, bot, player, socket, gameOver, stack]);

  return (
    <div className={classesList} key={opKey}>
      <OpponentFaceCards
        faceUpCards={faceUpCards}
        faceDownCards={faceDownCards}
        className={classes.face}
        player={player}
      />
      <OpponentHandCards handCards={handCards} className={classes.hand} />
      <PlayerInfo
        name={name}
        active={active}
        avatar={avatar}
        className={classes.info}
      />
    </div>
  );
};

export default Opponent;
