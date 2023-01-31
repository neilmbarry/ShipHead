import React from "react";
import classes from "./Card.module.css";
import CardImages from "../../utils/CardImages";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Card = ({
  className,
  name,
  style,
  onClick,
  back,
  selected,
  z,
  r,
  type,
}) => {
  const classesList = `${classes.main} ${className} ${
    selected && classes.selected
  }`;
  const image = CardImages[back ? "back" : name];
  const inlineStyle = {
    ...style,
  };
  const cardSelected = useSelector(
    (state) => state.user.value.selectedCards
  ).includes(name);

  let variants;

  const defaultVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,

      // scale: activeScale,

      transition: {
        type: "spring",

        duration: 0.3,
        delay: 0.1,
      },
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  const handVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: cardSelected ? -15 : 0,
      opacity: 1,
      transition: {
        // delay: 0.1,
      },
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
        // delay: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  const opHandVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
    exit: {
      y: 30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  const faceVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: cardSelected ? -15 : 0,
      opacity: 1,

      // scale: activeScale,
      transition: {
        delay: cardSelected ? 0 : 0.5,
      },
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  const opFaceVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,

      // scale: activeScale,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      y: 30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  const deckVariants = {
    hidden: {
      opacity: 0,
      scale: 1.2,
    },
    visible: {
      opacity: 1,
      // y: -30,
      scale: 1,
    },
    exit: {
      x: 30,
      opacity: 0,
    },
    hover: {},
  };

  const stackVariants = {
    hidden: {
      opacity: 0,
      scale: 1.2,
      // rotateZ: r * 24 - 220,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: (r * 24 + 15) % 360,
      transition: {
        type: "spring",

        duration: 0.5,
        delay: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      rotateZ: 360,
      transition: {
        duration: 0.3,
      },
    },
    hover: {},
  };

  const selectedVariants = {
    hidden: {
      y: 0,
      opacity: 1,
    },
    visible: {
      y: -10,
      opacity: 1,
      // transition: {
      //   delay: 0.3,
      // },
    },
    exit: {
      y: -30,
      opacity: 0,

      transition: {
        duration: 0.3,
      },
    },
    hover: {
      // scale: activeHover,
    },
  };

  variants = defaultVariants;

  if (type === "deck") {
    variants = deckVariants;
  }

  if (type === "stack") {
    variants = stackVariants;
  }

  if (type === "face") {
    variants = faceVariants;
  }

  if (type === "hand") {
    variants = handVariants;
  }

  if (type === "opHand") {
    variants = opHandVariants;
  }

  if (type === "opFace") {
    variants = opFaceVariants;
  }

  if (type === "selected") {
    variants = selectedVariants;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={variants.exit}
      className={classesList}
      // style={inlineStyle}
      onClick={onClick}
      layout
    >
      <img src={image} alt={name} />
    </motion.div>
  );
};

export default Card;
