import React, { useState, useRef } from "react";
import classes from "./Home.module.css";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import AvatarContainer from "../../components/Avatars/AvatarContainer";
import Notification from "../../components/UI/Notification";
import Modal from "../../components/UI/Modal";
import CreateGameModal from "./CreateGameModal";
import PlayComputerModal from "./PlayComputerModal";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [avatar, setAvatar] = useState();
  const [notification, setNotification] = useState();
  const [modal, setModal] = useState(false);
  const name = useRef();

  const createNewGameHandler = () => {
    if (!name.current.value) {
      return setNotification({
        type: "warning",
        text: "Please enter a valid name",
      });
    }
    setModal({ createGame: true });
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
      <CreateGameModal onClose={() => setModal(false)} />
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
        <Input type="text" placeholder="e.g tom hanks" inputRef={name} />
      </div>
      <div className={classes.avatarBox}>
        <h4>Choose your Avatar</h4>
        <AvatarContainer
          onAvatarClick={setAvatar}
          selectedAvatar={avatar}
        ></AvatarContainer>
      </div>
      <div className={classes.createGameBox}>
        <Button text={"Create a game"} onClick={createNewGameHandler} />
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
