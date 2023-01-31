import React from "react";
import classes from "./OpponentHandCards.module.css";
import Card from "../../../components/UI/Card";
import { AnimatePresence } from "framer-motion";
import CardImages from "../../../utils/CardImages";

const OpponentHandCards = ({ className, handCards }) => {
  const classesList = `${classes.main} ${className}`;

  const handCardsJSX = handCards?.map((card) => (
    <Card
      name="back"
      back={true}
      className={classes.card}
      key={card}
      type="opHand"
    />
  ));
  return (
    <div className={classesList}>
      <div className={classes.cardContainer}>
        {/* <AnimatePresence layout>{fullDeck}</AnimatePresence> */}
        <AnimatePresence layout>{handCardsJSX}</AnimatePresence>
      </div>
    </div>
  );
};

export default OpponentHandCards;

// Below is a nice function for testing

// const fullDeck = Object.keys(CardImages).map((name, i) => {
//   // if (i > 2) return null;
//   // if (i > 5) return null;
//   // if (i > 12) return null;
//   if (i > 25) return null;
//   if (i > 32) return null;
//   if (i > 42) return null;
//   return <Card name="back" back={true} className={classes.card} key={name} />;
// });
