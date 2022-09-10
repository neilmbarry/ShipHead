import React from "react";
import classes from "./Message.module.css";
import { useSelector } from "react-redux";

const Message = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const message = useSelector((state) => state.game.value.message);
  return (
    <div className={classesList}>
      <h4>{message.event}</h4>
      <h4>{message.announcement}</h4>
    </div>
  );
};

export default Message;
