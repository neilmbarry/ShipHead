import React from "react";
import classes from "./Message.module.css";
import { useSelector } from "react-redux";

const Message = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const message = useSelector((state) => state.game.value.message);
  return (
    <div className={classesList}>
      <h4>{message.gameEvent}</h4>
      <h4>{message.gameAnnouncement}</h4>
    </div>
  );
};

export default Message;
