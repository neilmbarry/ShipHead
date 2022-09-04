import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./Home.module.css";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import AvatarContainer from "../../components/Avatars/AvatarContainer";
import Notification from "../../components/UI/Notification";
import Modal from "../../components/UI/Modal";
import CreateGameModal from "./CreateGameModal";
import PlayComputerModal from "./PlayComputerModal";
import { useSelector } from "react-redux";
import { setNotification, setInfo } from "../../redux/userSlice";
import { createRoom, resetGame } from "../../redux/gameSlice";
import generateRoomId from "../../utils/generateRoomId";
import store from "../../redux/store";
import { io } from "socket.io-client";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  // const [avatar, setAvatar] = useState();
  const [notification, setNotification] = useState();
  const [modal, setModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const name = useRef();

  const params = useParams();

  const user = useSelector((state) => state.user.value);

  const setAvatarHandler = (avatar) => {
    setAvatar(avatar);
  };

  const createNewGameHandler = () => {
    setModal({ createGame: true });
  };

  const createRoomHandler = () => {
    const player = {
      name: name.current.value,
      avatar,
      // id: getPlayerId(),
      id: "PLAYER1ID",
    };
    store.dispatch(setInfo(player));

    //Set game to initial conditions
    store.dispatch(resetGame());

    //Join random room Id
    const roomId = generateRoomId();

    //-----IMPLEMENT ROOM JOIN FUNCTIONALITY----//
    // io.join(roomId);

    //Set room to room Id in GameSlice
    store.dispatch(
      createRoom({
        playerInfo: player,
        room: roomId,
        hostId: player.id,
      })
    );
    // Set user Id in UserSlice

    //Add host id in GameSlice
    //Add player to players in GameSlice
  };

  const playComputerHandler = () => {
    if (!name.current.value) {
      return setNotification({
        type: "alert",
        text: "Please enter a valid name",
      });
    }
    setModal({ playComputer: true });
  };

  const showNotification = notification && (
    <Notification
      notification={notification}
      onClose={() => setNotification(null)}
    />
  );
  const showCreateGameModal = modal.createGame && (
    <Modal onClose={() => setModal(false)}>
      <CreateGameModal
        onClose={() => setModal(false)}
        onStart={createRoomHandler}
      />
    </Modal>
  );
  const showPlayComputerModal = modal.playComputer && (
    <Modal onClose={() => setModal(false)}>
      <PlayComputerModal onClose={() => setModal(false)} />
    </Modal>
  );
  const showContactModal = modal.contact && (
    <Modal onClose={() => setModal(false)}></Modal>
  );

  return (
    <div className={classesList}>
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
          <Button text={"Join Neil's Game"} onClick={createNewGameHandler} />
        )}
        <Button text={"Create new game"} onClick={createNewGameHandler} />
        <Button text={"Play against computer"} onClick={playComputerHandler} />
      </div>
      {/* <div className={classes.codeBox}>
        <Input
          className={classes.codeInput}
          type="text"
          placeholder="Enter code e.g GE4I8S"
        />
        <Button
          text={"Join using code"}
          onClick={() => setNotification({ type: "info", text: "Some info" })}
        />
      </div> */}
      <div className={classes.footerBtns}>
        <Button
          text={"How to play"}
          type="small"
          onClick={() => setNotification({ type: "alert" })}
        />
        <Button
          text={"Contact"}
          type="small"
          onClick={() => setModal({ contact: true })}
        />
        <Button text={"Changelog"} type="small" />
        {/* <Button text={"English"} type="small" /> */}
      </div>
      {showNotification}
      {showCreateGameModal}
      {showPlayComputerModal}
      {showContactModal}
    </div>
  );
};

export default Home;
