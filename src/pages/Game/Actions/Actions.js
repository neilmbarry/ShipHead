import React from "react";
import classes from "./Actions.module.css";
import Button from "../../../components/UI/Button";
import { Link } from "react-router-dom";
import { useSocket } from "../../../context/SocketProvider";
import {
  selectFaceCards,
  autoSelectFaceCards,
  playCards,
  takeStack,
  sortCards,
  getPlayer,
} from "../../../gameLogic/gameLogic";

const Actions = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const socket = useSocket();
  const player = getPlayer();

  const playButton = player?.hasSetFaceUpCards ? (
    <Button text="Play" onClick={() => playCards(socket)} />
  ) : (
    <>
      <Button text="Select" onClick={() => selectFaceCards(socket)} />
      {
        // The Button below, when active, can automatically select the best cards for the face up selection
      }
      {/* <Button text="Auto" onClick={() => autoSelectFaceCards(socket)} /> */}
    </>
  );

  return (
    <div className={classesList}>
      {playButton}
      <Button text="take" onClick={() => takeStack(socket)} />
      <Button
        text="sort"
        onClick={() => {
          sortCards();
        }}
      />
      <Link to="/">
        <Button text="exit" className={classes.exit} />
      </Link>
    </div>
  );
};

export default Actions;
