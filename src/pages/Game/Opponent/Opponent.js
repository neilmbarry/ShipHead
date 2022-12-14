import React, { useEffect } from "react";
import classes from "./Opponent.module.css";
import OpponentInfo from "./OpponentInfo";
import OpponentFaceCards from "./OpponentFaceCards";
import OpponentHandCards from "./OpponentHandCards";
import { useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import {
  playValidMove,
  autoSelectFaceCards,
} from "../../../gameLogic/gameLogic";
import PlayerInfo from "../../../components/UI/PlayerInfo";

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
      {/* <OpponentInfo name={name} active={active} avatar={avatar} className={classes.info} /> */}
    </div>
  );
};

export default Opponent;
