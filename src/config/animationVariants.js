export const defaultVariants = {
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

export const playerHandCardVariants = {
  hidden: {
    y: -50,
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

export const opponentHandCardVariants = {
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

export const playerFaceCardVariants = {
  hidden: {
    y: -50,
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

export const opponentFaceCardVariants = {
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

export const deckVariants = {
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

export const stackVariants = (rotate) => ({
  hidden: {
    opacity: 0,
    scale: 1.2,
    // rotateZ: r * 24 - 220,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: (rotate * 24 + 15) % 360,
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
});

export const homePageVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    //   scale: 1.2,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: -200,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {},
};

export const gamePageVariants = {
  hidden: {
    opacity: 0,
    x: 300,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
    //   scale: 1,
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {},
};

export const notificationVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    x: "-50%",
  },
  visible: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: {
      duration: 0.3,
    },
    //   scale: 1,
  },
  exit: {
    y: -15,
    x: "-50%",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {},
};
