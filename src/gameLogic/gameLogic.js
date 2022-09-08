import {
  allCardsHaveEqualValue,
  generateDeck,
  cardsWillReverseDirection,
} from "./gameUtils";
import store from "../redux/store";
import { burnStack, hasToPickUp, switchActivePlayer } from "../redux/gameSlice";
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import userAction from "../redux/userSlice";
import { notifications } from "../config/notificationMessages";

export function gameState() {
  return store.getState().game.value;
}

export function userState() {
  return store.getState().user.value;
}

// const gameState().stack = gameState().stack;

const userId = userState().id;

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
        console.warn("Missing Case");
        return false;
    }
  }
  console.warn("Missing Case");
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
    id: player.id,
    handCardsWorth: handWorth(player.handCards),
  }));
  justIdAndCards.sort((a, b) => a.handCardsWorth - b.handCardsWorth);
  return justIdAndCards[0].id;
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

  const direction = gameStateCurrent.directionClockwise ? 1 : -1;
  let moves = direction * (1 + skip);
  let currentActivePlayer = players.find(
    (player) => player.id === gameStateCurrent.activePlayerId
  );
  let currentActivePlayerIndex = players.indexOf(currentActivePlayer);

  while (moves !== 0 && loopStop < 10) {
    let moveIndex = currentActivePlayerIndex + direction;
    if (moveIndex < 0) moveIndex += players.length;
    currentActivePlayerIndex = [moveIndex % players.length];
    if (!players[currentActivePlayerIndex].playing) {
      loopStop++;
    } else {
      moves -= direction;
      loopStop++;
    }
  }
  return players[currentActivePlayerIndex].id;
};
