import React from "react";
import classes from "./CreateGameModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Switch from "../../components/UI/Switch";
import { Link } from "react-router-dom";

const CreateGameModal = ({ className, onClose, onStart }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3 className={classes.title}>Create Game Room</h3>
      <h4>Room name</h4>
      <Input
        hideToggle={true}
        placeholder="neil's room"
        className={classes.input}
      />
      <div className={classes.passwordBox}>
        <h4>Enable Password</h4>
        <Switch />

        {/* <div className={classes.switch}></div> */}
      </div>
      <Input
        hideToggle={true}
        placeholder="enter password"
        className={classes.input}
      />

      <div className={classes.buttonsContainer}>
        <Button text="cancel" type="secondary" onClick={onClose} />
        <Link to="/lobby">
          <Button text="Create!" onClick={onStart} />
        </Link>
      </div>
    </div>
  );
};

export default CreateGameModal;
