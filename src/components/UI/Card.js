import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";

const Card = ({ className, name, style, onClick, back, selected, z, r }) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  const image = CardImages[back ? "back" : name];
  return (
    <div
      className={classesList}
      style={{ zIndex: z, transform: `rotate(${r * 20}deg)`, ...style }}
      onClick={onClick}
    >
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
