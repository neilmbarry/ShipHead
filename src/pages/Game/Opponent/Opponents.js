import React from "react";
import classes from "./Opponents.module.css";
import Opponent from "./Opponent";
import { useSelector } from "react-redux";

const Opponents = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const players = [...useSelector((state) => state.game.value.players)];
  console.log(players);
  const userId = useSelector((state) => state.user.value.id);
  const user = players.find((player) => player.id === userId);
  const userIndex = players.indexOf(user);
  console.log(userIndex, "ccccc");
  const playersBeforeUser = players.splice(0, userIndex);
  players.push(...playersBeforeUser);
  players.shift();
  console.log(players);
  const opponentsJSX = players.map((opponent) => (
    <Opponent
      key={opponent.id}
      handCards={opponent.handCards}
      faceUpCards={opponent.faceUpCards}
      faceDownCards={opponent.faceDownCards}
      name={opponent.name}
      playerId={opponent.id}
      avatar={opponent.avatar}
    />
  ));
  return <div className={classesList}>{opponentsJSX}</div>;
};

export default Opponents;
