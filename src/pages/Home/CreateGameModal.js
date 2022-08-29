import React from "react";
import classes from "./CreateGameModal.module.css";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Switch from "../../components/UI/Switch";

const CreateGameModal = ({ className, onClose }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <h3>Create Game Room</h3>
      <div className={classes.passwordBox}>
        <h4>Enable Password</h4>
        <Switch />

        {/* <div className={classes.switch}></div> */}
      </div>
      <Input hideToggle={true} placeholder="enter password" />
      <div className={classes.buttonsContainer}>
        <Button text="cancel" type="secondary" onClick={onClose} />
        <Button text="Create now!" />
      </div>
    </div>
  );
};

export default CreateGameModal;
