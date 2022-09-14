import { allCardsHaveEqualValue, cardsWillReverseDirection } from "./gameUtils";
import store from "../redux/store";

import userAction from "../redux/userSlice";
import { notifications } from "../config/notificationMessages";

export function gameState() {
  return store.getState().game.value;
}

export function userState() {
  return store.getState().user.value;
}

const getTopStackCard = () => {
  const stack = gameState().stack;
  return stack[stack.length - 1];
};

export function checkLegalMove(cards) {
  // Check if there are no cards or multiple different valued cards [played]
  if (cards.length === 0 || !allCardsHaveEqualValue(cards, gameState().deckRef))
    return false;
  // Check if there is an empty stack
  if (gameState().stack.length === 0) return true;
  // Check if it's a four of a kind [played]
  if (
    allCardsHaveEqualValue(cards, gameState().deckRef) &&
    cards.length === 4
  ) {
    return true;
  }
  // Set Player and Stack card info for comparison
  const topStackCardInfo = gameState().deckRef[getTopStackCard()];
  const playedCardInfo = gameState().deckRef[cards[0]];
  // Check if playing a power card
  if (playedCardInfo.power) {
    return true;
  }
  // Check if played card is of greater or equal value
  if (playedCardInfo.worth >= topStackCardInfo.worth) {
    return true;
  }
  // Check different cases for stack power card
  if (topStackCardInfo.power) {
    switch (topStackCardInfo.power) {
      case "reset":
        return true;
      case "skip":
        if (playedCardInfo.worth > 5) {
          return true;
        } else {
          return false;
        }
      case "lower":
        if (playedCardInfo.worth < 8 || playedCardInfo.worth === 15) {
          return true;
        } else {
          return false;
        }
      case "burn":
        return true;

      default:
        return false;
    }
  }

  return false;
}

const checkActivePlayer = (id) => {
  if (gameState().activePlayerId === id) return true;
  return false;
};

export const getActiveHand = (playerId) => {
  const player = gameState().players.find((player) => player.id === playerId);
  if (player?.handCards?.length > 0) return "handCards";
  if (player?.faceUpCards?.length > 0) return "faceUpCards";
  if (player?.faceDownCards?.length > 0) return "faceDownCards";
  return false;
};

const checkCardsAreInHand = (cards, playerId) => {
  const activeHand = getActiveHand(playerId);
  const player = gameState().players.find((player) => player.id === playerId);
  //MIGHT NOT WORK
  if (player[activeHand].includes(cards)) return true;
  return false;
};

export const checkWinner = (playerId) => {
  if (!getActiveHand(playerId)) {
    return true;
  }
  return false;
};

export const checkDrawCards = (playerId) => {
  if (gameState().stack.length === 0) return false;
  const player = gameState().players.find((player) => player.id === playerId);
  if (player.handCards >= 3) return false;
  const cardsToPickUp = 3 - player.handCards.length;
  const actualCardsToPickUp = Math.min(gameState().stack.length, cardsToPickUp);
  return actualCardsToPickUp;
};

const checkGameOver = () => {
  const activePlayers = gameState().players.filter(
    (player) => player.playing === true
  );
  if (activePlayers.length === 1) {
    return activePlayers[0].name;
  }
  return false;
};

export function setFaceCards(cards, playerId) {
  const toBeEmitted = [];
  const player = gameState().players.find((player) => player.id === playerId);

  if (player.hasSetFaceCards) return;

  if (cards.length !== 3) {
    return store.dispatch(
      userAction.setNotification(notifications.setThreeFaceCards)
    );
  }
  if (!checkCardsAreInHand(cards, playerId)) {
    store.dispatch(userAction.setNotification(notifications.cardsNotInHand));
    return;
  }
  toBeEmitted.push([
    "selectFaceUpCards",
    {
      playerId,
      cards,
    },
  ]);
}

export const allPlayersHaveSetFaceCards = () => {
  if (gameState().players.every((player) => player.hasSetFaceUpCards)) {
    return true;
  }
};

export const playerWithLowestStarter = () => {
  const handWorth = (cards) => {
    return cards.reduce((acc, card) => {
      return gameState().deckRef[card].worth + acc;
    }, 0);
  };
  const justIdAndCards = gameState().players.map((player) => ({
    player,
    handCardsWorth: handWorth(player.handCards),
  }));
  justIdAndCards.sort((a, b) => a.handCardsWorth - b.handCardsWorth);
  return justIdAndCards[0].player;
};

export function playCards(cards, playerId) {
  const toBeEmitted = [];
  if (!checkActivePlayer(playerId)) {
    store.dispatch(userAction.setNotification(notifications.notYourTurn));
    return;
  }
  if (!checkCardsAreInHand(cards, playerId)) {
    store.dispatch(userAction.setNotification(notifications.cardsNotInHand));
    return;
  }
  if (getActiveHand(playerId) !== "faceDownCards" && !checkLegalMove(cards)) {
    store.dispatch(userAction.setNotification(notifications.illegalMove));
    return;
  }
  //---ADD TO 'TO BE EMMITED' ARRAY------//
  toBeEmitted.push([
    "playCards",
    {
      playerId: "asdfasdf342",
      cards,
    },
  ]);

  if (!checkLegalMove(cards)) {
    //---ADD TO 'TO BE EMMITED' ARRAY------//
    toBeEmitted.push([
      "setGameAnnouncement",
      { message: "Betrayed by the blind Card!" },
    ]);
    toBeEmitted.push([
      "hasToPickUp",
      {
        playerId,
      },
    ]);
    return toBeEmitted;
  }

  if (checkWinner()) {
    toBeEmitted.push("setWinner", {
      playerId,
    });
  }
  if (checkDrawCards()) {
    toBeEmitted.push("drawCards", {
      playerId,
      quantity: checkDrawCards(),
    });
  }

  if (checkBurnStack()) {
    //---ADD TO 'TO BE EMMITED' ARRAY------//
    toBeEmitted.push([
      "setGameAnnouncement",
      {
        message: "It Burns!!",
      },
    ]);
    toBeEmitted.push(["burnStack"]);
    // store.dispatch(setGameAnnouncement());
    // store.dispatch(burnStack());

    // CONTINUE FROM HERE

    if (checkGameOver()) {
      toBeEmitted.push(["setGameOver"]);
      toBeEmitted.push([
        "setShipHead",
        {
          name: checkGameOver(),
        },
      ]);
      return toBeEmitted;
    }
  }
  if (cardsWillReverseDirection(cards)) {
    //---ADD TO 'TO BE EMMITED' ARRAY------//
    toBeEmitted.push([
      "changeDirection",
      {
        directionClockwise: !gameState().directionClockwise,
      },
    ]);
    toBeEmitted.push([
      "setGameAnnouncement",
      {
        message: "Reverse Direction",
      },
    ]);

    //TO BE IMPLEMENTED: REVERSE X2 CANCELS

    // store.dispatch(switchDirection());
    // store.dispatch(setGameAnnouncement());
  }
  //---ADD TO 'TO BE EMMITED' ARRAY------//
  toBeEmitted.push(["switchActivePlayer"]);
  //   store.dispatch(switchActivePlayer());
  //---RETURN 'TO BE EMMITED' ARRAY------//
  return toBeEmitted;
}

export function checkBurnStack() {
  // Check for empty stack
  if (gameState().stack.length === 0) return false;

  const topStackCardInfo =
    gameState().deckRef[getTopStackCard(gameState().stack)];

  if (topStackCardInfo.power === "burn") {
    return true;
  }
  if (gameState().stack.length < 4) return false;

  const lastFourCards = gameState().stack.filter(
    (card, i) => i >= gameState().stack.length - 4
  );

  if (allCardsHaveEqualValue(lastFourCards, gameState().deckRef)) {
    return true;
  }

  return false;
}

export const checkShipHead = () => {
  const playersPlaying = gameState().players.filter((player) => player.playing);
  if (playersPlaying.length === 1) {
    return playersPlaying[0];
  }
};

export const checkReverse = (cards, deckRef) => {
  if (!deckRef[cards[0]].reverse) return;
  if (cards.length % 2 === 1) return true;
};

// export const getNextPlayerId = (skip = 1) => {
//   const gameStateCurrent = gameState();
//   const direction = gameStateCurrent.directionClockwise;
//   let currentActivePlayerIndex = gameStateCurrent.players.indexOf(
//     (player) => player.playerId === gameStateCurrent.activePlayerId
//   );
//   let nextPlayerId = null;
//   while (!nextPlayerId) {
//     currentActivePlayerIndex =
//       (currentActivePlayerIndex + (direction ? 1 * skip : -1 * skip)) %
//       gameStateCurrent.players.length;
//     if (gameStateCurrent.players[currentActivePlayerIndex].playing) {
//       nextPlayerId = gameStateCurrent.players[currentActivePlayerIndex].id;
//     }
//   }
// };

export const getNextPlayerId = (skip = 0) => {
  let loopStop = 0;
  const gameStateCurrent = gameState();
  const players = gameStateCurrent.players;

  if (
    skip > 1 &&
    gameStateCurrent.players.filter((player) => player.playing).length === 2
  ) {
    skip = 1;
  }

  const direction = gameStateCurrent.directionClockwise ? 1 : -1;
  let moves = 1 + skip;
  const currentActivePlayer = players.find(
    (player) => player.id === gameStateCurrent.activePlayerId
  );
  let currentActivePlayerIndex = players.indexOf(currentActivePlayer);

  while (moves !== 0 && loopStop < 10) {
    let moveIndex = currentActivePlayerIndex + direction;
    if (moveIndex < 0) moveIndex += players.length;
    currentActivePlayerIndex = moveIndex % players.length;
    if (!players[currentActivePlayerIndex].playing) {
      loopStop++;
    } else {
      moves--;
      loopStop++;
    }
  }

  return players[currentActivePlayerIndex].id;
};

export function hasValidMove(player, hand) {
  const deckRef = gameState().deckRef;
  if (hand === "faceDownCards") {
    return [player[hand][0]];
  }
  const availableCards = player[hand];

  if (!availableCards) return false;

  const validCards = availableCards
    .filter((card) => checkLegalMove([card]))
    .sort((a, b) => deckRef[a].worth - deckRef[b].worth);

  const bestCards = validCards.filter(
    (card) => deckRef[card].worth === deckRef[validCards[0]].worth
  );

  // Find 4 of a kind
  let fourOfAKind = false;
  const cardsObject = {};
  availableCards.forEach((card) => {
    if (cardsObject[deckRef[card].worth]) {
      return cardsObject[deckRef[card].worth]++;
    }
    return (cardsObject[deckRef[card].worth] = 0);
  });
  const fourOfAKindWorth = Object.values(cardsObject).find((el) => el === 4);

  if (fourOfAKindWorth) {
    fourOfAKind = availableCards.filter(
      (card) => deckRef[card].worth === fourOfAKindWorth
    );
  }

  if (bestCards.length === 0 && !fourOfAKind) {
    return false;
  }
  return [...bestCards] || fourOfAKind;
}

// export const setBotFaceCards = (socket) => {
//   console.log("running here");
//   const currentGameState = gameState();
//   const bot = currentGameState.players.find((player) => {
//     return (
//       player.bot && !player.hasSetFaceUpCards && player.handCards.length > 0
//     );
//   });
//   if (!bot) return;
//   const orderedCards = [...bot.handCards].sort(
//     (a, b) =>
//       currentGameState.deckRef[a].worth - currentGameState.deckRef[b].worth
//   );
//   socket.emit("setFaceUpCards", {
//     playerId: bot.id,
//     cards: orderedCards.slice(3, 6),
//     room: currentGameState.room,
//   });
// };

export const returnBestThreeBestCards = (cards) => {
  const deckRef = gameState().deckRef;
  const orderedCards = [...cards].sort(
    (a, b) => deckRef[a].worth - deckRef[b].worth
  );
  return orderedCards.slice(3, 6);
};

export const playValidMove = (socket, player) => {
  const activeHand = getActiveHand(player.id);
  const stack = gameState().stack;
  if (hasValidMove(player, activeHand, stack) && !player.hasToPickUp) {
    return socket.emit("playCards", {
      player,
      hand: activeHand,
      cards: hasValidMove(player, activeHand, stack),
      room: gameState().room,
      deckRef: gameState().deckRef,
    });
  }
  socket.emit("takeStack", {
    player,
    room: gameState().room,
  });
  console.log(
    player.faceUpCards.length === 1,
    allCardsHaveEqualValue(player.faceUpCards, gameState().deckRef)
  );
  if (
    player.faceUpCards.length === 1 ||
    allCardsHaveEqualValue(player.faceUpCards, gameState().deckRef)
  ) {
    socket.emit("takeFaceCards", {
      player: userState,
      room: gameState.room,
    });
  }
};

export const getPlayerInfo = (id) => {
  return gameState().players.find((player) => player.id === id);
};
