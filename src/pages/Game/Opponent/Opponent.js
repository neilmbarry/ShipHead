import React, { useEffect } from "react";
import classes from "./Opponent.module.css";
import OpponentInfo from "./OpponentInfo";
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";
import { useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import {
  returnBestThreeBestCards,
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
  player,
}) => {
  const activePlayerId = useSelector(
    (state) => state.game.value.activePlayerId
  );
  const gameOver = useSelector((state) => state.game.value.gameOver);
  const active = activePlayerId === playerId ? "active" : "";
  const classesList = `${classes.main} ${className} ${classes[active]}`;
  const socket = useSocket();

  useEffect(() => {
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
    if (gameOver) return;
    if (!active) return;
    if (!bot) return;

    const computerValidMove = setTimeout(() => {
      playValidMove(socket, player);
    }, 2000);

    return () => {
      clearTimeout(computerValidMove);
    };
  }, [active, bot, player, socket, gameOver]);

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
