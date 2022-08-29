import React from "react";
import classes from "./Avatar.module.css";

const Avatar = ({ className, image, onClick, selected }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  return (
    <div className={classesList} onClick={onClick}>
      <img src={image} alt="a" />
    </div>
  );
};

export default Avatar;
