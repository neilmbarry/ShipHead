import React from "react";
import classes from "./Input.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({
  className,
  type,
  placeholder,
  inputRef,
  defaultVal,
  onReset,
  name,
}) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classes.container}>
      <input
        type={type}
        className={classesList}
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={defaultVal || name}
        value={name}
      />
      <FontAwesomeIcon
        icon={faClose}
        className={classes.reset}
        onClick={onReset}
      />
    </div>
  );
};

export default Input;
