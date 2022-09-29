import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import classes from "./JoinGameModal.module.css";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/UI/Input";
import RoomsContainer from "./UI/RoomsContainer";
import RoomItem from "./UI/RoomItem";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";

const JoinGameModal = ({ className, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  console.log("joingamemodal rerendered");
  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setRoomList([]);
    setTimeout(() => {
      setRoomList([
        { password: true },
        { password: true },
        {},
        { password: true },
        {},
        { password: true },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const roomListJSX = roomList.map((room, i) => {
    return (
      <RoomItem
        password={room.password}
        key={i}
        selected={i === selectedRoom}
        onClick={() => {
          console.log("here", i);
          setSelectedRoom(i);
        }}
      />
    );
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className={classesList}>
      <div className={classes.title}>
        <h3>Room list</h3>
        <div className={classes.refresh} onClick={fetchRooms}>
          <FontAwesomeIcon icon={faRefresh} />
          <h5>refresh</h5>
        </div>
      </div>
      <Input placeholder="find a room..." />
      <RoomsContainer>
        {loading && <Spinner />}
        {roomListJSX}
      </RoomsContainer>
      <div className={classes.password}>
        <h4>password</h4>
        <div className={classes.passwordInput}>
          <Input placeholder="enter password" type="password" />
          <Button text="join" />
        </div>
      </div>

      <div className={classes.buttonsContainer}>
        <Button text="cancel" type="secondary" onClick={onClose} />

        <Button text="Create new room" onClick={null} />
      </div>
    </div>
  );
};

export default JoinGameModal;
