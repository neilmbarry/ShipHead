import React, { useState, useRef } from "react";
import classes from "./Home.module.css";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import AvatarContainer from "../../components/Avatars/AvatarContainer";
import Notification from "../../components/UI/Notification";

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [avatar, setAvatar] = useState();
  const [notification, setNotification] = useState();
  return (
    <div className={classesList}>
      <h1>SHiP-HEAD!</h1>
      <div className={classes.nameBox}>
        <h4>Player Name</h4>
        <Input type="text" placeholder="e.g tom hanks" />
      </div>
      <div className={classes.avatarBox}>
        <h4>Choose your Avatar</h4>
        {/* <div className={classes.avatarBtns}>
          <Button text={"Male"} />
          <Button text={"Female"} />
        </div> */}
        <AvatarContainer
          onAvatarClick={setAvatar}
          selectedAvatar={avatar}
        ></AvatarContainer>
      </div>
      <div className={classes.createGameBox}>
        <Button
          text={"Create a game"}
          onClick={() => setNotification({ type: "warning" })}
        />
        <Button
          text={"Play against computer"}
          onClick={() => setNotification(null)}
        />
      </div>
      <div className={classes.codeBox}>
        <Input type="text" placeholder="Enter code e.g GE4I8S" />
        <Button text={"Join using code"} />
      </div>
      <div className={classes.footerBtns}>
        <Button text={"How to play"} />
        <Button text={"Contact"} />
        <Button text={"Changelog"} />
        <Button text={"English"} />
      </div>
      {notification && (
        <Notification
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Home;
