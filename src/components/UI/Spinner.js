import React from "react";
import classes from "./Spinner.module.css";

const Spinner = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  //   console.log(classes);
  return (
    <div className={classes.container}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default Spinner;
