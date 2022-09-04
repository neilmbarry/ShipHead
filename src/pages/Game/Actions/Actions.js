import React from "react";
import classes from "./Actions.module.css";
import Button from "../../../components/UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Actions = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const player = gameState.players.find((player) => player.id === userState.id);
  console.log(player);
  const playerHasSetFaceCards = player.hasSetFaceUpCards;
  const selectedCards = userState.selectedCards;

  const selectFaceCardsHandler = () => {};

  const playCardsHandler = () => {};

  const takeCardsHandler = () => {};

  const sortCardsHandler = () => {};

  return (
    <div className={classesList}>
      {!playerHasSetFaceCards ? (
        <Button text="Select" onClick={selectFaceCardsHandler} />
      ) : (
        <Button text="Play" onClick={playCardsHandler} />
      )}

      <Button text="take" onClick={takeCardsHandler} />
      <Button text="sort" onClick={sortCardsHandler} />
      <Link to="/">
        <Button text="exit" />
      </Link>
    </div>
  );
};

export default Actions;
