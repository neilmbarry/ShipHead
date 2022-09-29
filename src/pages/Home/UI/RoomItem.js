import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./RoomItem.module.css";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const RoomItem = ({ className, password }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h4>Neil's room</h4>
      <div className={classes.info}>
        {password && <FontAwesomeIcon icon={faLock} />}
        <h4>3/4</h4>
      </div>
    </div>
  );
};

export default RoomItem;
