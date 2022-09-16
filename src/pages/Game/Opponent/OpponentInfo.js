import React from "react";
import classes from "./OpponentInfo.module.css";
import Avatar from "../../../components/Avatars/Avatar";

const OpponentInfo = ({ className, name, avatar, active }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Avatar
        image={avatar}
        className={`${classes.avatar} ${classes[active]}`}
      />
      <h6 className={`${classes.name} ${classes[active]}`}>{name}</h6>
    </div>
  );
};

export default OpponentInfo;
