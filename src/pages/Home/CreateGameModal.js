import React from "react";
import classes from "./CreateGameModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Switch from "../../components/UI/Switch";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import gameActions from "../../redux/gameSlice";
import userActions from "../../redux/userSlice";
import { useSocket } from "../../context/SocketProvider";

const CreateGameModal = ({ className, onClose, onStart, name }) => {
  const password = useRef();
  const roomName = useRef();
  const classesList = `${classes.main} ${className}`;
  const user = useSelector((state) => state.user.value);
  const socket = useSocket();

  const createRoomHandler = () => {
    // const player = {
    //   name: name.current.value,
    //   avatar: user.avatar || "avatar6",
    //   id: user.id,
    // };
    // // setModal(false);
    // store.dispatch(userActions.setInfo(player));

    store.dispatch(gameActions.resetGame());

    // const roomId = user.id;
    const roomId = roomName.current.value || `${user.name}'s room`;

    socket.emit("joinRoom", { roomId, player: user });

    store.dispatch(
      gameActions.createRoom({
        playerInfo: user,
        room: roomId,
        hostId: user.id,
        password: password.current.value,
      })
    );

    store.dispatch(userActions.setModal(null));
  };

  return (
    <div className={classesList}>
      <h3 className={classes.title}>Create Game Room</h3>
      <h4>Room name</h4>
      <Input
        hideToggle={true}
        placeholder={`${user.name}'s room`}
        className={classes.input}
        inputRef={roomName}
      />
      <div className={classes.passwordBox}>
        <h4>Enable Password</h4>
        <Switch />

        {/* <div className={classes.switch}></div> */}
      </div>
      <Input
        hideToggle={true}
        placeholder="enter password"
        className={classes.input}
        inputRef={password}
      />

      <div className={classes.buttonsContainer}>
        <Button text="cancel" type="secondary" onClick={onClose} />
        <Link to="/lobby">
          <Button text="Create!" onClick={createRoomHandler} />
        </Link>
      </div>
    </div>
  );
};

export default CreateGameModal;
