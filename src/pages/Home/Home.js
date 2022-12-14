// Main imports
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// State Management
import userActions from "../../redux/userSlice";
import gameActions from "../../redux/gameSlice";
import { useSocket } from "../../context/SocketProvider";
import store from "../../redux/store";

// Styles
import classes from "./Home.module.css";
import { motion } from "framer-motion";
import { homePageVariants } from "../../config/animationVariants";

// Components
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import AvatarContainer from "../../components/Avatars/AvatarContainer";

const Home = () => {
  const [avatar, setAvatar] = useState(null);
  const name = useRef();
  const socket = useSocket();
  const params = useParams();

  const resetName = () => {
    name.current.value = "";
  };

  const user = useSelector((state) => state.user.value);

  const setAvatarHandler = (avatar) => {
    setAvatar(avatar);
  };

  const confirmModal = (type) => {
    if (!name.current.value) {
      return store.dispatch(
        userActions.setNotification({
          type: "warning",
          message: "Please enter a valid name",
        })
      );
    }
    const player = {
      name: name.current.value,
      avatar: avatar || `avatar${Math.ceil(Math.random() * 8)}`,
    };

    store.dispatch(userActions.setInfo(player));
    store.dispatch(
      userActions.setModal({
        type,
      })
    );
  };

  const createRoomHandler = ({ roomName, password }) => {
    const player = {
      name: name.current.value,
      avatar: avatar || "avatar6",
    };
    // setModal(false);
    store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    // const roomId = user.id;
    const roomId = roomName;

    socket.emit("joinRoom", { roomId, player });

    store.dispatch(
      gameActions.createRoom({
        playerInfo: player,
        room: roomId,
        hostId: player.id,
        password,
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

  return (
    <motion.div
      variants={homePageVariants}
      initial="hidden"
      animate="visible"
      exit={homePageVariants.exit}
      className={classes.main}
    >
      <h1 className={classes.title}>SHiP-HEAD!</h1>
      <div className={classes.nameBox}>
        <h4>Player Name</h4>
        <Input
          type="text"
          placeholder="e.g tom hanks"
          defaultVal={user.name}
          inputRef={name}
          onReset={resetName}
        />
      </div>
      <div className={classes.avatarBox}>
        <h4>Choose your Avatar</h4>
        <AvatarContainer
          onAvatarClick={setAvatarHandler}
          defaultVal={user.avatar}
          selectedAvatar={avatar}
        ></AvatarContainer>
      </div>
      <div className={classes.createGameBox}>
        {params.roomId && (
          <Link to="/lobby">
            <Button text={"Join Neil's Game"} onClick={joinGameHandler} />
          </Link>
        )}
        <Button
          text={"Create new game"}
          onClick={() => confirmModal("createGame")}
        />
        {/* <Button text={"Join game"} onClick={() => confirmModal("joinGame")} /> */}
        <Button
          text={"Play against computer"}
          onClick={() => confirmModal("playComputer")}
        />
      </div>
      <div className={classes.footerBtns}>
        <Button text={"How to play"} type="small" onClick={null} />
        <Button
          text={"Contact"}
          type="small"
          onClick={() => confirmModal("contact")}
        />
        <Button text={"Changelog"} type="small" />
      </div>
    </motion.div>
  );
};

export default Home;
