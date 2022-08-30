import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";

const Card = ({ className, name, style }) => {
  const classesList = `${classes.main} ${className}`;
  const image = CardImages[name];
  return (
    <div className={classesList} style={style}>
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
