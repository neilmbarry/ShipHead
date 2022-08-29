import React from "react";
import classes from "./Switch.module.css";

const Switch = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <>
      <input type="checkbox" id="switch" className={classes.switch} />
      <label htmlFor="switch" className={classes.label}>
        Toggle
      </label>
    </>
  );
};

export default Switch;
