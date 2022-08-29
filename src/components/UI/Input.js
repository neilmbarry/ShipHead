import React from "react";
import classes from "./Input.module.css";

const Input = ({ className, type, placeholder, inputRef }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <input
      type={type}
      className={classesList}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};

export default Input;
