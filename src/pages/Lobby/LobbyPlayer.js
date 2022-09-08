import React from "react";
import classes from "./LobbyPlayer.module.css";
import Avatar from "../../components/Avatars/Avatar";

const LobbyPlayer = ({ className, image, name }) => {
  const classesList = `${classes.main} ${className}`;
  const nameJSX = name ? (
    <h4 className={classes.name}>{name}</h4>
  ) : (
    <div>
      <div className={classes.empty}></div>
    </div>
  );
  return (
    <div className={classesList}>
      <Avatar image={image} initial={!name} className={classes.avatar} />
      <div className={`${classes.nameContainer} ${!name && classes.initial}`}>
        {nameJSX}
      </div>
    </div>
  );
};

export default LobbyPlayer;
