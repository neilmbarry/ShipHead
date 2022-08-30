import React from "react";
import classes from "./Game.module.css";
import Button from "../../components/UI/Button";
import Opponent from "./Opponent/Opponent";
import Player from "./Player/Player";
import card from "../../assets/8BitDeckAssets 2.png";
import card2 from "../../assets/2Hearts.jpg";

const Game = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <div className={classes.player1}>
        <Player />
      </div>
      <div className={classes.player2}>
        <Opponent />
      </div>
      <div className={classes.player3}>
        <Opponent />
      </div>
      <div className={classes.player4}>
        <Opponent />
      </div>
      <div className={classes.actions}>
        <Button text="Play" />
        <Button text="take" />
        <Button text="sort" />
      </div>
      <div className={classes.stack}>
        {/* <div className={classes.cardContainer}> */}
        {/* <img src={card} alt="" /> */}
        {/* <img src={card2} alt="" /> */}
        {/* </div> */}
      </div>
      <div className={classes.deck}></div>
      <div className={classes.message}>
        <h4>Neil has played a 3!</h4>
        <h4>Pick it Up!!</h4>
      </div>
    </div>
  );
};

export default Game;
