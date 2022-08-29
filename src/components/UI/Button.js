import React from "react";
import classes from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ className, onClick, text, beforeIcon, afterIcon, type }) => {
  const classesList = `${classes.main} ${classes[type]} ${className}`;

  const beforeIconJSX = beforeIcon && <FontAwesomeIcon icon={beforeIcon} />;

  const afterIconJSX = afterIcon && <FontAwesomeIcon icon={afterIcon} />;

  return (
    <button className={classesList} onClick={onClick}>
      {beforeIconJSX}
      {text && text}
      {afterIconJSX}
    </button>
  );
};

export default Button;
