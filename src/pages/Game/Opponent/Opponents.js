import React from "react";
import classes from "./Opponents.module.css";
import Opponent from "./Opponent";
import { useSelector } from "react-redux";

const Opponents = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const players = [...useSelector((state) => state.game.value.players)];
  const room = useSelector((state) => state.game.value.room);
  const userId = useSelector((state) => state.user.value.id);
  const user = players.find((player) => player.id === userId);
  const userIndex = players.indexOf(user);
  const playersBeforeUser = players.splice(0, userIndex);
  players.push(...playersBeforeUser);
  players.shift();
  const opponentsJSX = players.map((opponent, i) => (
    <Opponent
      opKey={opponent.id + i}
      key={opponent.id + i}
      handCards={opponent.handCards}
      faceUpCards={opponent.faceUpCards}
      faceDownCards={opponent.faceDownCards}
      hasSetFaceCards={opponent.hasSetFaceUpCards}
      name={opponent.name}
      playerId={opponent.id}
      avatar={opponent.avatar}
      bot={opponent.bot}
      room={room}
      player={opponent}
    />
  ));
  const noOpponentsJSX = <div>waiting for opponents...</div>;
  return (
    <div className={classesList}>
      {opponentsJSX.length > 0 ? opponentsJSX : noOpponentsJSX}
    </div>
  );
};

export default Opponents;
