import React from "react";
import classes from "./RoomsContainer.module.css";

const RoomsContainer = ({ className, children }) => {
  const classesList = `${classes.main} ${className}`;
  return <div className={classesList}>{children}</div>;
};

export default RoomsContainer;
