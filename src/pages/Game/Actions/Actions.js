import React from "react";
import classes from "./Actions.module.css";
import Button from "../../../components/UI/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketProvider";
import store from "../../../redux/store";
import userActions from "../../../redux/userSlice";
import gameActions from "../../../redux/gameSlice";
import { checkLegalMove, hasValidMove } from "../../../gameLogic/gameLogic";
import { sortCards } from "../../../gameLogic/gameUtils";

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
    if (selectedCards.length === 0) {
      return store.dispatch(
        userActions.setNotification({
          type: "alert",
          message: "Please select card(s)",
        })
      );
    }
    const legalMove = checkLegalMove(selectedCards);
    if (!legalMove && activeHand() !== "faceDownCards") {
      store.dispatch(userActions.setSelecteCards([]));
      return store.dispatch(
        userActions.setNotification({
          type: "alert",
          message: "You cannot play that card",
        })
      );
    }
    socket.emit("playCards", {
      playerId: userState.id,
      hand: activeHand(),
      cards: selectedCards,
      room: gameState.room,
    });
    store.dispatch(userActions.setSelecteCards([]));
  };

  const takeCardsHandler = () => {
    if (hasValidMove(player, activeHand(), gameState.stack)) {
      store.dispatch(userActions.setSelecteCards([]));
      return store.dispatch(
        userActions.setNotification({
          type: "alert",
          message: "You have a valid move",
        })
      );
    }
    socket.emit("takeStack", {
      id: userState.id,
      room: gameState.room,
    });
    store.dispatch(userActions.setSelecteCards([]));
  };

  const sortCardsHandler = () => {
    store.dispatch(
      gameActions.sortHandCards({
        id: player.id,
        deckRef: gameState.deckRef,
      })
    );
  };

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
