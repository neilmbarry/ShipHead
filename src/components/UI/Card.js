import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";

const Card = ({ className, name, style, onClick, selected, z, r }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  const image = CardImages[name];
  return (
    <div
      className={classesList}
      style={{ ...style, zIndex: z, transform: `rotate(${r * 20}deg)` }}
      onClick={onClick}
    >
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
