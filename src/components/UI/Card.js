import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";

const Card = ({ className, name, style, onClick, selected, z }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  const image = CardImages[name];
  return (
    <div
      className={classesList}
      style={{ ...style, zIndex: z }}
      onClick={onClick}
    >
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
