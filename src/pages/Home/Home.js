import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./Home.module.css";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import AvatarContainer from "../../components/Avatars/AvatarContainer";

import Modal from "../../components/UI/Modal";
import CreateGameModal from "./CreateGameModal";
import PlayComputerModal from "./PlayComputerModal";
import { useSelector } from "react-redux";
import userActions from "../../redux/userSlice";
import gameActions from "../../redux/gameSlice";

import store from "../../redux/store";
import { useSocket } from "../../context/SocketProvider";
import { Link } from "react-router-dom";

import { generateDeck } from "../../gameLogic/gameUtils";

import { motion } from "framer-motion";
import { homePageVariants } from "../../config/animationVariants";
import JoinGameModal from "./JoinGameModal";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [modal, setModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const name = useRef();
  const socket = useSocket();
  const params = useParams();
  const user = useSelector((state) => state.user.value);

  const setAvatarHandler = (avatar) => {
    setAvatar(avatar);
  };

  const showNewGameModal = () => {
    setModal({ createGame: true });
  };

  const showJoinRoomModal = () => {
    setModal({ joinRoom: true });
  };

  const showComputerModal = () => {
    setModal({ playComputer: true });
  };

  const createRoomHandler = () => {
    const player = {
      name: name.current.value,
      avatar: avatar || "avatar1",
      id: user.id,
    };
    setModal(false);
    store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    const roomId = user.id;

    socket.emit("joinRoom", { roomId, player });

    store.dispatch(
      gameActions.createRoom({
        playerInfo: player,
        room: roomId,
        hostId: player.id,
      })
    );
  };

  const joinGameHandler = () => {
    const roomId = params.roomId;
    const player = {
      name: name.current.value,
      avatar: avatar || "avatar2",
      id: user.id,
    };
    store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    store.dispatch(gameActions.setRoom(roomId));

    socket.emit("joinRoom", { roomId, player });
  };

  const createComputerGame = (quantity) => {
    const player = {
      name: name.current.value || "Anon",
      avatar: avatar || "avatar3",
      id: user.id,
    };
    store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    const roomId = user.id;

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
    setTimeout(() => {
      store.dispatch(gameActions.dealCards());
    }, 2000);
  };

  const CreateGameModalJsx = (
    <Modal onClose={() => setModal(false)} show={modal.createGame}>
      <CreateGameModal
        onClose={() => setModal(false)}
        onStart={createRoomHandler}
      />
    </Modal>
  );
  const PlayComputerModalJsx = (
    <Modal onClose={() => setModal(false)} show={modal.playComputer}>
      <PlayComputerModal
        onClose={() => setModal(false)}
        onPlayComputer={createComputerGame}
      />
    </Modal>
  );

  const JoinGameModalJsx = (
    <Modal onClose={() => setModal(false)} show={modal.joinRoom}>
      <JoinGameModal />
    </Modal>
  );

  const showContactModal = modal.contact && (
    <Modal onClose={() => setModal(false)}></Modal>
  );

  return (
    <motion.div
      variants={homePageVariants}
      initial="hidden"
      animate="visible"
      exit={homePageVariants.exit}
      className={classesList}
    >
      <h1 className={classes.title}>SHiP-HEAD!</h1>
      <div className={classes.nameBox}>
        <h4>Player Name</h4>
        <Input
          type="text"
          placeholder="e.g tom hanks"
          defaultVal={user.name}
          inputRef={name}
        />
      </div>
      <div className={classes.avatarBox}>
        <h4>Choose your Avatar</h4>
        <AvatarContainer
          onAvatarClick={setAvatarHandler}
          selectedAvatar={avatar}
        ></AvatarContainer>
      </div>
      <div className={classes.createGameBox}>
        {params.roomId && (
          <Link to="/lobby">
            <Button text={"Join Neil's Game"} onClick={joinGameHandler} />
          </Link>
        )}
        <Button text={"Create new game"} onClick={showNewGameModal} />
        <Button text={"Join game"} onClick={showJoinRoomModal} />
        <Button text={"Play against computer"} onClick={showComputerModal} />
      </div>
      <div className={classes.footerBtns}>
        <Button text={"How to play"} type="small" onClick={null} />
        <Button
          text={"Contact"}
          type="small"
          onClick={() => setModal({ contact: true })}
        />
        <Button text={"Changelog"} type="small" />
      </div>
      {CreateGameModalJsx}
      {PlayComputerModalJsx}
      {JoinGameModalJsx}
      {showContactModal}
    </motion.div>
  );
};

export default Home;
