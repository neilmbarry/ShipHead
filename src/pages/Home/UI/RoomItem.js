import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./RoomItem.module.css";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const RoomItem = ({ className, password, selected, onClick }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  return (
    <div className={classesList} onClick={onClick}>
      <h4>Neil's room</h4>
      <div className={classes.info}>
        {password && <FontAwesomeIcon icon={faLock} />}
        <h4>3/4</h4>
      </div>
    </div>
  );
};

export default RoomItem;
