import React from "react";
import classes from "./ConnectingModal.module.css";
import Spinner from "./Spinner";

const ConnectingModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Connecting to server...</h3>
      <Spinner />
    </div>
  );
};

export default ConnectingModal;
