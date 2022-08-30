import React from "react";
import classes from "./PlayerFace.module.css";

const PlayerFace = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>PlayerFace</div>;
};

export default PlayerFace;
