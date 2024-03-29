// State management
import store from "../redux/store";
import userActions from "../redux/userSlice";
import gameActions from "../redux/gameSlice";

// Utils
import { allCardsHaveEqualValue } from "./gameUtils";
import { notifications } from "../config/notificationMessages";

export function gameState() {
  return store.getState().game.value;
}

export function userState() {
  return store.getState().user.value;
}

function getState() {
  return [store.getState().game.value, store.getState().user.value];
}

export function getPlayer() {
  const [gameState, userState] = getState();
  return gameState.players.find((player) => player.id === userState.id);
}

function isActive(player) {
  const gameState = getState()[0];
  if (gameState.activePlayerId === player.id) return true;
  return false;
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

export function setFaceCards(cards, playerId) {
  const toBeEmitted = [];
  const player = gameState().players.find((player) => player.id === playerId);

  if (player.hasSetFaceCards) return;

  if (cards.length !== 3) {
    return store.dispatch(
      userActions.setNotification(notifications.setThreeFaceCards)
    );
  }
  if (!checkCardsAreInHand(cards, playerId)) {
    store.dispatch(userActions.setNotification(notifications.cardsNotInHand));
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

export function hasValidMove(player) {
  const deckRef = gameState().deckRef;
  const activeHand = getActiveHand(player.id);
  if (activeHand === "faceDownCards") {
    return [player[activeHand][0]];
  }
  const availableCards = player[activeHand];

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

export const returnBestThreeBestCards = (cards) => {
  if (!cards) return;
  const deckRef = gameState().deckRef;
  const orderedCards = [...cards].sort(
    (a, b) => deckRef[a].worth - deckRef[b].worth
  );
  return orderedCards.slice(3, 6);
};

export const getPlayerInfo = (id) => {
  return gameState().players.find((player) => player.id === id);
};

export function selectFaceCards(socket) {
  const [gameState, userState] = getState();
  if (userState.selectedCards.length !== 3) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "info",
        message: "You must select 3 cards",
      })
    );
  }
  socket.emit("setFaceUpCards", {
    playerId: userState.id,
    cards: userState.selectedCards,
    room: gameState.room,
  });
  store.dispatch(userActions.setSelectedCards([]));
}

export function autoSelectFaceCards(socket, player = getPlayer()) {
  if (player.handCards.length === 0) return;
  const gameState = getState()[0];
  socket.emit("setFaceUpCards", {
    playerId: player.id,
    cards: returnBestThreeBestCards(player.handCards),
    room: gameState.room,
  });
}

export function playValidMove(socket, player = getPlayer()) {
  const gameState = getState()[0];
  if (!isActive(player)) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "alert",
        message: "It is not your turn",
      })
    );
  }
  const activeHand = getActiveHand(player.id);
  if (hasValidMove(player) && !player.hasToPickUp) {
    return socket.emit("playCards", {
      player,
      hand: activeHand,
      cards: hasValidMove(player),
      room: gameState.room,
      deckRef: gameState.deckRef,
    });
  }
  if (
    player.handCards.length === 0 &&
    allCardsHaveEqualValue(player.faceUpCards, gameState.deckRef)
  ) {
    socket.emit("takeFaceCards", {
      player,
      room: gameState.room,
    });
  }
  socket.emit("takeStack", {
    player,
    room: gameState.room,
  });
}

export function playCards(socket) {
  const [gameState, userState] = getState();
  const player = getPlayer();
  // Check player is active
  if (!isActive(player)) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "warning",
        message: "It is not your turn",
      })
    );
  }
  // Check if player MUST pick up
  if (player.hasToPickUp) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "alert",
        message: "You must pick up the stack!",
      })
    );
  }
  // Check player has selected cards
  if (userState.selectedCards.length === 0) {
    return store.dispatch(
      userActions.setNotification({
        type: "alert",
        message: "Please select your card(s)",
      })
    );
  }
  // Check move is legal
  const legalMove = checkLegalMove(userState.selectedCards);
  if (!legalMove && getActiveHand(player.id) !== "faceDownCards") {
    // The conditional above checks the active hand is not face down because in this instance a player may make an illegal move only if it is a blind card. They will then have to pick up the stack.
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "alert",
        message: "You cannot play that card",
      })
    );
  }
  // Plays the selected card(s)
  socket.emit("playCards", {
    player: userState,
    hand: getActiveHand(player.id),
    cards: userState.selectedCards,
    room: gameState.room,
    deckRef: gameState.deckRef,
  });
  store.dispatch(userActions.setSelectedCards([]));
}

export function takeStack(socket, player = getPlayer()) {
  const gameState = getState()[0];
  if (!isActive(player)) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "warning",
        message: "It is not your turn",
      })
    );
  }
  if (player.hasToPickUp) {
    socket.emit("takeStack", {
      player,
      room: gameState.room,
    });
    return store.dispatch(userActions.setSelectedCards([]));
  }
  if (hasValidMove(player)) {
    store.dispatch(userActions.setSelectedCards([]));
    return store.dispatch(
      userActions.setNotification({
        type: "alert",
        message: "You have a valid move",
      })
    );
  }
  if (
    player.handCards.length === 0 &&
    allCardsHaveEqualValue(player.faceUpCards, gameState.deckRef)
  ) {
    socket.emit("takeFaceCards", {
      player,
      room: gameState.room,
    });
  }
  socket.emit("takeStack", {
    player,
    room: gameState.room,
  });
  store.dispatch(userActions.setSelectedCards([]));
}

export function sortCards() {
  const gameState = getState()[0];
  const player = getPlayer();
  store.dispatch(
    gameActions.sortHandCards({
      id: player.id,
      deckRef: gameState.deckRef,
    })
  );
}
