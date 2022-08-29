import React from "react";
import classes from "./Tile.module.css";

const Tile = ({ className, children }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>{children}</div>;
};

export default Tile;
