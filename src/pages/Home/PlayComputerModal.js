import React, { useState } from "react";
import classes from "./PlayComputerModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";

const PlayComputerModal = ({ className, onClose, onPlayComputer }) => {
  const classesList = `${classes.main} ${className}`;
  const [selected, setSelected] = useState(null);
  const playComputerHandler = () => {
    onClose();

    onPlayComputer(selected);
  };
  return (
    <div className={classesList}>
      <h3>vs. computer</h3>

      <h4>Select opponents</h4>
      <div className={classes.opponentsBox}>
        <div
          className={`${classes.opponent} ${
            selected === 2 && classes.selected
          }`}
          onClick={() => setSelected(2)}
        >
          <h2>2</h2>
        </div>
        <div
          className={`${classes.opponent} ${
            selected === 3 && classes.selected
          }`}
          onClick={() => setSelected(3)}
        >
          <h2>3</h2>
        </div>
        <div
          className={`${classes.opponent} ${
            selected === 4 && classes.selected
          }`}
          onClick={() => setSelected(4)}
        >
          <h2>4</h2>
        </div>
      </div>

      <div className={classes.buttonsContainer}>
        <Button text="Cancel" type="secondary" onClick={onClose} />
        <Link to="/game">
          <Button text="Play!" onClick={playComputerHandler} />
        </Link>
      </div>
    </div>
  );
};

export default PlayComputerModal;
