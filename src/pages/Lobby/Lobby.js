import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Lobby.module.css";
import Tile from "../../components/UI/Tile";
import LobbyPlayer from "./LobbyPlayer";
import Button from "../../components/UI/Button";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import Notification from "../../components/UI/Notification";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/SocketProvider";
import { generateDeck } from "../../gameLogic/gameUtils";

import { motion } from "framer-motion";
import { lobbyPageVariants } from "../../config/animationVariants";
import store from "../../redux/store";
import userActions from "../../redux/userSlice";

const Lobby = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [notification, setNotification] = useState(false);
  const socket = useSocket();
  const gameState = useSelector((state) => state.game.value);
  const userState = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const location = useLocation();

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

  const playerJSXXX = emptyJSX.map((player, i) => {
    if (players[i]) {
      return (
        <LobbyPlayer key={i} name={players[i].name} image={players[i].avatar} />
      );
    }
    return <LobbyPlayer key={i} />;
  });

  const playersJSXTest = players.map((player) => {
    return (
      <LobbyPlayer key={player.id} name={player.name} image={player.avatar} />
    );
  });

  const showCopyNotification = notification.copy && (
    <Notification
      notification={notification}
      onClose={() => setNotification(false)}
    />
  );
  const showFewPeopleNotification = notification.few && (
    <Notification
      notification={notification}
      onClose={() => setNotification(false)}
    />
  );

  const roomLink = window.location.origin;

  useEffect(() => {
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

        <div
          className={classes.codeBox}
          onClick={() => {
            navigator.clipboard.writeText(`${roomLink}/${room}`).then(() => {
              store.dispatch(
                userActions.setNotification({
                  copy: true,
                  type: "success",
                  message: "Link copied to clipboard!",
                })
              );
              // setNotification({
              //   copy: true,
              //   type: "success",
              //   text: "Link copied to clipboard!",
              // });
            });
          }}
        >
          <h4>Room ID: {room}</h4>
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </Tile>
      <Tile className={classes.largerTile}>
        <div className={classes.playersContainer}>
          {/* <LobbyPlayer image="avatar1" name="Neil" />
          <LobbyPlayer />
          <LobbyPlayer />
          <LobbyPlayer /> */}
          {playerJSXXX}
          {/* {playersJSXTest} */}
        </div>
        <div className={classes.buttonsContainer}>
          <Link to="/">
            <Button type="back" beforeIcon={faAnglesLeft} />
          </Link>
          {/* <Link to="/game"> */}
          <Button text="Start game" onClick={startGameHandler} />
          {/* </Link> */}

          <Spinner />
        </div>
      </Tile>
      {showCopyNotification}
      {showFewPeopleNotification}
    </motion.div>
  );
};

export default Lobby;
