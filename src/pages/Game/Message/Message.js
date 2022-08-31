import React from "react";
import classes from "./Message.module.css";

const Message = ({ className, gameEvent, gameAnnouncement }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h4>{gameEvent}</h4>
      <h4>{gameAnnouncement}</h4>
    </div>
  );
};

export default Message;
