// Main imports
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Tile from "../../components/UI/Tile";
import LobbyPlayer from "./LobbyPlayer";
import Spinner from "../../components/UI/Spinner";
import Button from "../../components/UI/Button";

// Styles
import classes from "./Lobby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { lobbyPageVariants } from "../../config/animationVariants";

// State management / Game logic
import store from "../../redux/store";
import { useSocket } from "../../context/SocketProvider";
import { generateDeck } from "../../gameLogic/gameUtils";
import userActions from "../../redux/userSlice";

const Lobby = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const socket = useSocket();
  const gameState = useSelector((state) => state.game.value);
  const userState = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const players = gameState.players;
  const room = gameState.room;

  const startGameHandler = () => {
    socket.emit("startGame", {
      ...generateDeck(),
      room,
    });
  };

  const emptyJSX = [
    <LobbyPlayer />,
    <LobbyPlayer />,
    <LobbyPlayer />,
    <LobbyPlayer />,
  ];

  const playersArrayComponent = emptyJSX.map((player, i) => {
    if (players[i]) {
      return (
        <LobbyPlayer key={i} name={players[i].name} image={players[i].avatar} />
      );
    }
    return <LobbyPlayer key={i} />;
  });

  function copyLinkToClipboard() {
    const baseURL = window.location.origin;
    navigator.clipboard.writeText(`${baseURL}/${room}`).then(() => {
      store.dispatch(
        userActions.setNotification({
          copy: true,
          type: "success",
          message: "Link copied to clipboard!",
        })
      );
    });
  }

  useEffect(() => {
    // Redirects unconnected users
    if (!gameState.gameOver) {
      return navigate("/game");
    }
    if (!userState.id) {
      store.dispatch(
        userActions.setNotification({
          type: "warning",
          message: "You were disconnected",
          duration: 3000,
        })
      );

      return navigate("/");
    }
  }, [gameState, navigate, userState.id]);

  return (
    <motion.div
      variants={lobbyPageVariants}
      initial="hidden"
      animate="visible"
      exit={lobbyPageVariants.exit}
      className={classesList}
    >
      <Tile className={classes.firstTile}>
        <h4>Waiting for other players...</h4>
        <div className={classes.codeBox} onClick={copyLinkToClipboard}>
          <h4>Room ID: {room}</h4>
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </Tile>
      <Tile className={classes.largerTile}>
        <div className={classes.playersContainer}>{playersArrayComponent}</div>
        <div className={classes.buttonsContainer}>
          <Link to="/">
            <Button type="back" beforeIcon={faAnglesLeft} />
          </Link>
          <Button text="Start game" onClick={startGameHandler} />
          <Spinner />
        </div>
      </Tile>
    </motion.div>
  );
};

export default Lobby;
