import React from "react";
import classes from "./OpponentInfo.module.css";
import Avatar from "../../../components/Avatars/Avatar";

const OpponentInfo = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Avatar image="avatar1" className={classes.avatar} />
      <h6>Neil</h6>
    </div>
  );
};

export default OpponentInfo;
