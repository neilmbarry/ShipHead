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

const Lobby = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [notification, setNotification] = useState(false);
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
  return (
    <div className={classesList}>
      <Tile className={classes.firstTile}>
        <h4>Waiting for other players...</h4>
        <div
          className={classes.codeBox}
          onClick={() =>
            setNotification({
              copy: true,
              type: "success",
              text: "Code copied to clipboard!",
            })
          }
        >
          <h4>o2k37o</h4>
          <FontAwesomeIcon icon={faCopy} />
        </div>
      </Tile>
      <Tile className={classes.largerTile}>
        <div className={classes.playersContainer}>
          <LobbyPlayer image="avatar1" name="Neil" />
          {/* <LobbyPlayer image="avatar3.png" name="Steph" />
          <LobbyPlayer image="avatar8.png" name="Amar" /> */}
          <LobbyPlayer />
          <LobbyPlayer />
          <LobbyPlayer />
        </div>
        <div className={classes.buttonsContainer}>
          <Link to="/">
            <Button type="back" beforeIcon={faAnglesLeft} />
          </Link>
          <Link to="/game">
            <Button
              text="Start game"
              // onClick={() =>
              //   setNotification({
              //     few: true,
              //     type: "alert",
              //     text: "Not enough people to start game!",
              //   })
              // }
            />
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
