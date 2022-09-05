import React, { useState } from "react";
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

const Lobby = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [notification, setNotification] = useState(false);

  const gameState = useSelector((state) => state.game.value);
  const players = gameState.players;
  const room = gameState.room;

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
  // const playersJSX = gamePlayers.map((player) => (
  //   <LobbyPlayer name={player.name} image={player.avatar} />
  // ));
  return (
    <div className={classesList}>
      <Tile className={classes.firstTile}>
        <h4>Waiting for other players...</h4>
        <a href={`http://localhost:3000/${room}`} target="_blank">
          <div
            className={classes.codeBox}
            onClick={() => {
              // navigator.clipboard
              //   .writeText(`http://localhost:3000/${room}`)
              //   .then(() => {
              //     setNotification({
              //       copy: true,
              //       type: "success",
              //       text: "Link copied to clipboard!",
              //     });
              //   });
            }}
          >
            <h4>Room ID: {room}</h4>
            <FontAwesomeIcon icon={faCopy} />
          </div>
        </a>
      </Tile>
      <Tile className={classes.largerTile}>
        <div className={classes.playersContainer}>
          {/* <LobbyPlayer image="avatar1" name="Neil" />
          <LobbyPlayer />
          <LobbyPlayer />
          <LobbyPlayer /> */}
          {playerJSXXX}
        </div>
        <div className={classes.buttonsContainer}>
          <Link to="/">
            <Button type="back" beforeIcon={faAnglesLeft} />
          </Link>
          <Link to="/game">
            <Button text="Start game" />
          </Link>

          <Spinner />
        </div>
      </Tile>
      {showCopyNotification}
      {showFewPeopleNotification}
    </div>
  );
};

export default Lobby;
