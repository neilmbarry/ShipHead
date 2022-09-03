import { allCardsHaveEqualValue, generateDeck } from "./gameUtils";
import store from "../redux/store";
import { burnStack, hasToPickUp, switchActivePlayer } from "../redux/gameSlice";
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons";
import { setNotification } from "../redux/userSlice";
import { notifications } from "../config/notificationMessages";

const gameState = store.getState((state) => state.gameState.value);
const stackState = store.getState((state) => state.gameState.value).stack;
const playerId = store.getState((state) => state.user.value.id);
const playerState = store
  .getState((state) => state.gameState.value)
  .players.find((player) => player.id === playerId);
const playersState = store.getState((state) => state.gameState.value).players;

const [deck, deckRef] = generateDeck();

const getTopStackCard = () => {
  return stackState[stackState.length - 1];
};

export function checkLegalMove(cards) {
  // Check if there are no cards or multiple different valued cards [played]
  if (cards.length === 0 || !allCardsHaveEqualValue(cards, deckRef))
    return false;
  // Check if there is an empty stack
  if (stackState.length === 0) return true;
  // Check if it's a four of a kind [played]
  if (allCardsHaveEqualValue(cards, deckRef) && cards.length === 4) {
    return true;
  }
  // Set Player and Stack card info for comparison
  const topStackCardInfo = deckRef[getTopStackCard()];
  const playedCardInfo = deckRef[cards[0]];
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
  if (gameState.activePlayer === id) return true;
  return false;
};

const getActiveHand = (playerId) => {
  const player = playersState.find((player) => player.id === playerId);
  if (player.handCards.length > 0) return "handCards";
  if (player.faceUpCards.length > 0) return "faceUpCards";
  if (player.faceDownCards.length > 0) return "faceDownCards";
  return false;
};

const checkCardsAreInHand = (cards, playerId) => {
  const activeHand = getActiveHand(playerId);
  const player = playersState.find((player) => player.id === playerId);
  //MIGHT NOT WORK
  if (player[activeHand].includes(cards)) return true;
  return false;
};

const checkWinner = (playerId) => {
  if (!getActiveHand(playerId)) {
    return true;
  }
  return false;
};

const checkDrawCards = (playerId) => {
  if (stackState.length === 0) return false;
  const player = playersState.find((player) => player.id === playerId);
  if (player.handCards >= 3) return false;
  const cardsToPickUp = 3 - player.handCards.length;
  const actualCardsToPickUp = Math.min(stackState.length, cardsToPickUp);
  return actualCardsToPickUp;
};

export function playCards(cards, playerId) {
  const toBeEmitted = [];
  if (!checkActivePlayer(playerId)) {
    store.dispatch(setNotification(notifications.notYourTurn));
    return;
  }
  if (!checkCardsAreInHand(cards, playerId)) {
    store.dispatch(setNotification(notifications.cardsNotInHand));
    return;
  }
  if (getActiveHand(playerId) !== "faceDownCards" && !checkLegalMove(cards)) {
    store.dispatch(setNotification(notifications.illegalMove));
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

  //   store.dispatch(
  //     playCards({
  //       playerId: "asdfasdf342",
  //       cards,
  //     })
  //   );
  //---ADD TO 'TO BE EMMITED' ARRAY------//
  const playerName = playersState.find((player) => player.id === playerId).name;
  toBeEmitted.push(["setGameEvent", { name: playerName, cards }]);

  //   store.dispatch(setGameEvent());

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
    return;
    // store.dispatch(setGameAnnouncement("Betrayed by the blind Card!"));
    // return store.dispatch(hasToPickUp(playerId));
  }

  //---ADD RETURN VALUES TO 'TO BE EMMITED' ARRAY------//
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

    return checkAndSetGameOver();
  }
  if (checkDirectionSwitch()) {
    //---ADD TO 'TO BE EMMITED' ARRAY------//
    store.dispatch(switchDirection());
    store.dispatch(setGameAnnouncement());
  }
  //---ADD TO 'TO BE EMMITED' ARRAY------//
  store.dispatch(switchActivePlayer());
  //---RETURN 'TO BE EMMITED' ARRAY------//
}

export function checkBurnStack() {
  // Check for empty stack
  if (stackState.length === 0) return false;

  const topStackCardInfo = deckRef[getTopStackCard(stackState)];

  if (topStackCardInfo.power === "burn") {
    return true;
  }
  if (stackState.length < 4) return false;

  const lastFourCards = stackState.filter(
    (card, i) => i >= stackState.length - 4
  );

  if (allCardsHaveEqualValue(lastFourCards, deckRef)) {
    return true;
  }

  return false;
}
