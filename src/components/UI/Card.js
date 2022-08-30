import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";

const Card = ({ className, name }) => {
  const classesList = `${classes.main} ${className}`;
  const image = CardImages[name];
  return (
    <div className={classesList}>
      <img src={image} alt={name} />
    </div>
  );
};

export default Card;
