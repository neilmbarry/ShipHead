import React from "react";
import classes from "./PlayerFaceCards.module.css";
import Card from "../../../components/UI/Card";
import { useSelector } from "react-redux";
import store from "../../../redux/store";
import userActions from "../../../redux/userSlice";
import { AnimatePresence } from "framer-motion";

const PlayerFace = ({
  className,
  faceUpCards,
  faceDownCards,
  activeHand,
  player,
}) => {
  const active = activeHand !== "handCards" ? "active" : "";
  const hide = activeHand === "faceDownCards" ? "hide" : "";
  const classesList = `${classes.main} ${className} ${classes[active]}`;

  const selectedCards = useSelector((state) => state.user.value.selectedCards);

  const deckRef = useSelector((state) => state.game.value.deckRef);

  const selectCardHandler = (name) => {
    if (selectedCards.includes(name)) {
      return store.dispatch(
        userActions.setSelecteCards(
          selectedCards.filter((card) => card !== name)
        )
      );
    }
    if (!player.hasSetFaceUpCards) {
      if (selectedCards.length === 3) {
        return store.dispatch(
          userActions.setSelecteCards([...selectedCards.slice(1, 3), name])
        );
      }
    }

    if (player.hasSetFaceUpCards) {
      if (
        selectedCards.length > 0 &&
        deckRef[name].worth !== deckRef[selectedCards[0]].worth
      ) {
        return store.dispatch(userActions.setSelecteCards([name]));
      }
    }

    if (activeHand === "faceDownCards") {
      return store.dispatch(userActions.setSelecteCards([name]));
    }

    return store.dispatch(
      userActions.setSelecteCards([...selectedCards, name])
    );
  };

  const faceUpJSX = faceUpCards?.map((card) => {
    return (
      <Card
        className={classes.card}
        name={card}
        key={card}
        selected={selectedCards.includes(card)}
        type="face"
        onClick={() => {
          if (activeHand === "faceUpCards") {
            selectCardHandler(card);
          }
        }}
      />
    );
  });
  const faceDownJSX = faceDownCards?.map((card) => {
    return (
      <Card
        className={classes.card}
        name={card}
        back={true}
        key={card}
        selected={selectedCards.includes(card)}
        type="face"
        onClick={() => {
          console.log("tryuig");
          if (activeHand === "faceDownCards") return selectCardHandler(card);
        }}
      />
    );
  });
  return (
    <div className={classesList}>
      <div className={`${classes.faceUp} ${classes[hide]}`}>
        <AnimatePresence>{faceUpJSX}</AnimatePresence>
      </div>
      <div className={classes.faceDown}>
        <AnimatePresence>{faceDownJSX}</AnimatePresence>
      </div>
    </div>
  );
};

export default PlayerFace;
