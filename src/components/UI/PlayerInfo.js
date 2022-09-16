import React from "react";
import classes from "./PlayerInfo.module.css";
import Avatar from "../Avatars/Avatar";

const PlayerInfo = ({ className, avatar, name, active }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.avatarContainer}>
        <Avatar
          image={avatar}
          className={`${classes.avatar} ${classes[active]}`}
        />
        <h6 className={`${classes.name} ${classes[active]}`}>{name}</h6>
      </div>
    </div>
  );
};

export default PlayerInfo;
