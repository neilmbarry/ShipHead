import React from "react";
import classes from "./Actions.module.css";
import Button from "../../../components/UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import store from "../../../redux/store";
import userActions from "../../../redux/userSlice";

const Actions = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const userState = useSelector((state) => state.user.value);
  const gameState = useSelector((state) => state.game.value);
  const socket = useSocket();
  const player = gameState.players.find((player) => player.id === userState.id);
  const activeHand = () => {
    if (player.handCards.length > 0) {
      return "handCards";
    }
    if (player.faceUpCards.length > 0) {
      return "faceUpCards";
    }
    if (player.faceDownCards.length > 0) {
      return "faceDownCards";
    }
  };

  const playerHasSetFaceCards = player?.hasSetFaceUpCards;
  const selectedCards = userState.selectedCards;

  const selectFaceCardsHandler = () => {
    if (selectedCards.length !== 3) return;
    socket.emit("setFaceUpCards", {
      playerId: userState.id,
      cards: selectedCards,
      room: gameState.room,
    });
    store.dispatch(userActions.setSelecteCards([]));
  };

  const playCardsHandler = () => {
    console.log("emiiting cards to play");
    console.log(activeHand());
    socket.emit("playCards", {
      playerId: userState.id,
      hand: activeHand(),
      cards: selectedCards,
      room: gameState.room,
    });
    store.dispatch(userActions.setSelecteCards([]));
  };

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
