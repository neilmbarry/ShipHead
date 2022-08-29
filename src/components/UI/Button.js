import React from "react";
import classes from "./Button.module.css";

const Button = ({ className, onClick, text, beforeIcon, afterIcon, type }) => {
  const classesList = `${classes.main} ${classes[type]} ${className}`;
  return (
    <button className={classesList} onClick={onClick}>
      {beforeIcon}
      {text}
      {afterIcon}
    </button>
  );
};

export default Button;
