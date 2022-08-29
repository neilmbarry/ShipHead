import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, onClick, text, beforeIcon, afterIcon }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <button className={classesList} onClick={onClick}>
      {beforeIcon}
      {text}
      {afterIcon}
    </button>
  );
};

export default Button;
