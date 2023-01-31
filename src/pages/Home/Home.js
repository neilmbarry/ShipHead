// Main imports
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// Checks user has entered valid name
function nameCheck(ref) {
  if (!ref.current.value) {
    store.dispatch(
      userActions.setNotification({
        type: "warning",
        message: "Please enter a valid name",
      })
    );
    return false;
  }
  return true;
}

// Function Component
const Home = () => {
  const params = useParams();
  const navigate = useNavigate();
  const socket = useSocket();

  const user = useSelector((state) => state.user.value);

  // Component level state
  const name = useRef();
  const [avatar, setAvatar] = useState(user.avatar);
  const resetName = () => {
    name.current.value = "";
  };
  const setAvatarHandler = (avatar) => {
    setAvatar(avatar);
  };

  const computerModal = () => {
    // Validates name and show computer modal to selected number of opponents
    if (!nameCheck(name)) return;
    const player = {
      name: name.current.value,
      avatar: avatar || `avatar${Math.ceil(Math.random() * 8)}`,
    };

    store.dispatch(userActions.setInfo(player));
    store.dispatch(
      userActions.setModal({
        type: "playComputer",
      })
    );
  };

  const createRoomHandler = () => {
    // Validates name and joins room with user's id. Navigates to lobby where a link is provider for other users to join room
    if (!nameCheck(name)) return;
    const player = {
      name: name.current.value,
      avatar: avatar || `avatar${Math.ceil(Math.random() * 8)}`,
      id: user.id,
    };

    store.dispatch(userActions.setInfo(player));
    console.log("creating game");
    store.dispatch(gameActions.resetGame());

    const roomId = user.id;

    socket.emit("joinRoom", { roomId, player: user });

    store.dispatch(
      gameActions.createRoom({
        playerInfo: player,
        room: roomId,
        hostId: user.id,
      })
    );
    navigate("/lobby");
  };

  const joinGameHandler = () => {
    // If the id parameter exists in the url a 'Join Game' button will be rendered allowing the user to join the room given by the id
    if (!name.current.value) {
      return store.dispatch(
        userActions.setNotification({
          type: "warning",
          message: "Please enter a valid name",
        })
      );
    }
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
    navigate("/lobby");
  };

  // Below are functions that show the rules and contact modals
  const showRules = () => {
    return store.dispatch(
      userActions.setModal({
        type: "rules",
      })
    );
  };

  const showContact = () => {
    console.log("showing contact");
    store.dispatch(
      userActions.setModal({
        type: "contact",
      })
    );
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
          <Button text={"Join Friend's Game"} onClick={joinGameHandler} />
        )}

        <Button text={"Create new game"} onClick={createRoomHandler} />
        <Button text={"Play against computer"} onClick={computerModal} />
      </div>
      <div className={classes.footerBtns}>
        <Button text={"How to play"} type="small" onClick={showRules} />
        <Button text={"Contact"} type="small" onClick={showContact} />
      </div>
    </motion.div>
  );
};

export default Home;
