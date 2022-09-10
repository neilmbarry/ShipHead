import store from "../redux/store";
import userActions from "../redux/userSlice";
import gameActions from "../redux/gameSlice";
import {
  gameState,
  checkLegalMove,
  checkBurnStack,
  checkDrawCards,
  checkWinner,
  getNextPlayerId,
  checkShipHead,
  checkReverse,
} from "../gameLogic/gameLogic";
import { cardsToText } from "../gameLogic/gameUtils";

export const socketFunctions = (socket) => {
  socket.on("message", (message) => {
    console.warn(message);
  });

  socket.on("userID", (userID) => {
    console.warn("GAME RESET!");
    store.dispatch(gameActions.resetGame());
    store.dispatch(userActions.setId(userID));
  });

  socket.on("shareGameState", (newPlayer) => {
    socket.emit("setGameState", {
      state: gameState(),
      newPlayer,
    });
  });

  socket.on("setGameState", (state) => {
    store.dispatch(gameActions.setGameState(state));
  });

  socket.on("addPlayer", (player) => {
    console.log("New Player has joined: ", player.name);
    store.dispatch(gameActions.addPlayer(player));
  });

  socket.on("removePlayer", (playerId) => {
    store.dispatch(gameActions.removePlayer(playerId));
  });

  socket.on("startGame", (info) => {
    store.dispatch(gameActions.startGame(info));
    store.dispatch(gameActions.setGameEvent("welcome to ship-head"));
    store.dispatch(
      gameActions.setGameAnnouncement("the game is about to begin")
    );

    setTimeout(() => {
      store.dispatch(gameActions.dealCards());
      store.dispatch(gameActions.setGameEvent("select your face up cards"));
      store.dispatch(gameActions.setGameAnnouncement("(pick three)"));
    }, 1000);
  });

  socket.on("setFaceUpCards", ({ cards, playerId }) => {
    store.dispatch(gameActions.selectFaceUpCards({ cards, playerId }));
  });

  socket.on("setActivePlayer", (player) => {
    store.dispatch(gameActions.setActivePlayer(player.id));
    store.dispatch(
      gameActions.setGameEvent("who has the worst starting hand?")
    );
    store.dispatch(
      gameActions.setGameAnnouncement(`${player.name}! You may begin!`)
    );
  });

  socket.on("playCards", ({ cards, player, hand, deckRef }) => {
    const legalMove = checkLegalMove(cards);
    console.log(cards, player, hand, deckRef);
    store.dispatch(gameActions.playCards({ cards, player, hand }));

    store.dispatch(
      gameActions.setGameEvent(
        `${player.name} has played ${cardsToText(cards, deckRef)}`
      )
    );
    store.dispatch(gameActions.setGameAnnouncement(``));
    // Check legal move
    if (!legalMove) {
      store.dispatch(
        gameActions.setGameAnnouncement(`betrayed by the blind card!`)
      );
      return store.dispatch(gameActions.hasToPickUp(player.id));
    }
    // // Check draw cards
    if (checkDrawCards(player.id)) {
      store.dispatch(
        gameActions.drawCard({
          id: player.id,
          quantity: checkDrawCards(player.id),
        })
      );
    }
    // Check winner
    if (checkWinner(player.id)) {
      store.dispatch(gameActions.setWinner(player.id));
      store.dispatch(
        gameActions.setGameAnnouncement(`${player.name} is a winner!}`)
      );
    }
    // Check Burn
    if (checkBurnStack()) {
      store.dispatch(gameActions.burnStack());
      store.dispatch(gameActions.setGameAnnouncement(`it burns!`));
      if (checkShipHead()) {
        store.dispatch(gameActions.setGameAnnouncement(`game over!}`));
        store.dispatch(gameActions.setShipHead(checkShipHead()));
        return store.dispatch(gameActions.setGameOver(true));
      }
    }
    // Check SHIPHEAD
    if (checkShipHead()) {
      store.dispatch(gameActions.setGameAnnouncement(`game over!`));
      store.dispatch(gameActions.setShipHead(checkShipHead()));
      return store.dispatch(gameActions.setGameOver(true));
    }
    // Check reverse
    if (checkReverse(cards, deckRef)) {
      store.dispatch(gameActions.setGameAnnouncement(`Switching direction!`));
    }

    // Switch Player
    store.dispatch(gameActions.switchActivePlayer(getNextPlayerId()));
  });

  socket.on("takeStack", (player) => {
    store.dispatch(gameActions.takeStack(player.id));
    store.dispatch(gameActions.setGameEvent(`${player.name} has picked up!`));
    store.dispatch(gameActions.switchActivePlayer(getNextPlayerId()));
  });

  socket.on("takeFaceCards", (player) => {
    store.dispatch(gameActions.takeFaceCards(player.id));
  });

  // socket.on("setFaceUpCards", ({ cards, player }) => {
  //   console.log("called");
  //   setFaceUpCards(cards, player);
  // });
  // socket.on("pickUpStack", (player) => {
  //   console.log("picking up stack");
  //   pickUpStack(player);
  // });
  // socket.on("playCards", (data) => {
  //   console.log("Received playCards data: ", data);
  //   playCards(data.selected, data.hand, data.playerNumber);
  // });
  // socket.on("sortCards", (player) => {
  //   sortCards(player);
  // });
  // socket.on("drawCardsFromDeck", (player) => {
  //   drawCardsFromDeck(player);
  // });
  // socket.on("reset", () => {
  //   initializeNewGame();
  // });
  // socket.on("newGame", () => {
  //   console.log("starting new game");
  //   startNewGame();
  // });
  // socket.on("readyPlayer", (player) => {
  //   readyUp(player);
  // });
};
