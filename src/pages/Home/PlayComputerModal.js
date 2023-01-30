import React, { useState } from "react";
import classes from "./PlayComputerModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import gameActions from "../../redux/gameSlice";
import userActions from "../../redux/userSlice";
import { useSocket } from "../../context/SocketProvider";
import { generateDeck } from "../../gameLogic/gameUtils";

const PlayComputerModal = ({ className, onClose, onPlayComputer }) => {
  const classesList = `${classes.main} ${className}`;
  const socket = useSocket();
  const [selected, setSelected] = useState(null);
  const playerInfo = useSelector((state) => state.user.value);

  const createComputerGame = (quantity) => {
    const player = {
      name: playerInfo.name || "Anon",
      avatar: playerInfo.avatar || "avatar3",
      id: playerInfo.id,
    };
    // store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    const roomId = playerInfo.id;

    socket.emit("joinRoom", { roomId, player });

    store.dispatch(
      gameActions.createRoom({
        playerInfo: player,
        room: roomId,
        hostId: player.id,
      })
    );

    for (let i = 1; i < quantity; i++) {
      store.dispatch(
        gameActions.addPlayer({
          name: `bot ${i}`,
          avatar: `avatar${Math.floor(Math.random() * 8) + 1}`,
          bot: true,
          id: i,
        })
      );
    }
    store.dispatch(gameActions.startGame(generateDeck()));
    store.dispatch(userActions.setModal(null));
    socket.emit("startGame", {
      ...generateDeck(),
      room: roomId,
    });
    // setTimeout(() => {
    //   store.dispatch(gameActions.dealCards());
    // }, 2000);
  };

  const playComputerHandler = () => {
    onClose();

    onPlayComputer(selected);
  };
  return (
    <div className={classesList}>
      <h3>vs. computer</h3>

      <h4>Select opponents</h4>
      <div className={classes.opponentsBox}>
        <div
          className={`${classes.opponent} ${
            selected === 2 && classes.selected
          }`}
          onClick={() => setSelected(2)}
        >
          <h2>2</h2>
        </div>
        <div
          className={`${classes.opponent} ${
            selected === 3 && classes.selected
          }`}
          onClick={() => setSelected(3)}
        >
          <h2>3</h2>
        </div>
        <div
          className={`${classes.opponent} ${
            selected === 4 && classes.selected
          }`}
          onClick={() => setSelected(4)}
        >
          <h2>4</h2>
        </div>
      </div>

      <div className={classes.buttonsContainer}>
        <Button text="Cancel" type="secondary" onClick={onClose} />
        <Link to="/game">
          <Button text="Play!" onClick={() => createComputerGame(selected)} />
        </Link>
      </div>
    </div>
  );
};

export default PlayComputerModal;
