import React from "react";
import classes from "./Avatar.module.css";
import AvatarImages from "../../utils/AvatarImages";

const Avatar = ({ className, image, onClick, selected }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  const pic = image ? <img src={AvatarImages[image]} alt="a" /> : null;

  return (
    <div className={classesList} onClick={onClick}>
      {pic}
    </div>
  );
};

export default Avatar;
