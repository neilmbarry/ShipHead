import React from "react";
import classes from "./AvatarContainer.module.css";
import Avatar from "./Avatar";
import AvatarImages from "../../utils/AvatarImages";

const AvatarContainer = ({
  className,
  children,
  onAvatarClick,
  selectedAvatar,
}) => {
  const classesList = `${classes.main} ${className}`;
  const avatarsListJSX = Object.keys(AvatarImages).map((image) => {
    return (
      <Avatar
        key={image}
        image={image}
        onClick={() => onAvatarClick(image)}
        selected={selectedAvatar === image}
        initial={selectedAvatar !== image}
      />
    );
  });
  return <div className={classesList}>{avatarsListJSX}</div>;
};

export default AvatarContainer;
