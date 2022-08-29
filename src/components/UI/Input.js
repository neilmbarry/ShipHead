import React from "react";
import classes from "./Input.module.css";

const Input = ({ className, type, placeholder }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <input type={type} className={classesList} placeholder={placeholder} />
  );
};

export default Input;
