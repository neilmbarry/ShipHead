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

  const fetchRooms = useCallback(async () => {
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
    return <RoomItem password={room.password} key={i} />;
  });

  //   useEffect(() => {
  //     fetchRooms()
  //       .then(console.log("here"))
  //       .finally(() => setLoading(false));
  //     return () => {};
  //   }, [fetchRooms]);

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

      <div className={classes.buttonsContainer}>
        <Button text="cancel" type="secondary" onClick={onClose} />

        <Button text="Create room!" onClick={null} />
      </div>
    </div>
  );
};

export default JoinGameModal;
