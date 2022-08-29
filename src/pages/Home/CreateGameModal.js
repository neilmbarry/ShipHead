import React from "react";
import classes from "./CreateGameModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Switch from "../../components/UI/Switch";
import { Link } from "react-router-dom";

const CreateGameModal = ({ className, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h2 className={classes.title}>Create Game Room</h2>
      <div className={classes.passwordBox}>
        <h3>Enable Password</h3>
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
        <Link to="/lobby/testID">
          <Button text="Create now!" />
        </Link>
      </div>
    </div>
  );
};

export default CreateGameModal;
