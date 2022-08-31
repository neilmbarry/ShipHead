import React from "react";
import classes from "./Actions.module.css";
import Button from "../../../components/UI/Button";
import { Link } from "react-router-dom";

const Actions = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <Button text="Play" />
      <Button text="take" />
      <Button text="sort" />
      <Link to="/">
        <Button text="exit" />
      </Link>
    </div>
  );
};

export default Actions;
