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
    }, 500);
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

  socket.on("playCards", async ({ cards, player, hand, deckRef }) => {
    const legalMove = checkLegalMove(cards);

    store.dispatch(gameActions.playCards({ cards, player, hand }));
    setTimeout(() => {
      store.dispatch(
        gameActions.setGameEvent(
          `${player.name} has played ${cardsToText(cards, deckRef)}!`
        )
      );
    }, 750);
    store.dispatch(gameActions.setGameAnnouncement(``));
    // Check legal move
    if (!legalMove) {
      setTimeout(() => {
        store.dispatch(
          gameActions.setGameAnnouncement(`betrayed by the blind card!`)
        );
      }, 1500);
      return store.dispatch(gameActions.hasToPickUp(player.id));
    }
    // // Check draw cards
    if (checkDrawCards(player.id)) {
      await new Promise((r) => setTimeout(r, 1000));
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
        gameActions.setGameAnnouncement(`${player.name} is a winner!`)
      );
    }
    // Check Burn
    if (checkBurnStack()) {
      await new Promise((r) => setTimeout(r, 750));
      store.dispatch(gameActions.burnStack());
      store.dispatch(gameActions.setGameAnnouncement(`it burns!`));
      if (checkShipHead()) {
        store.dispatch(gameActions.setGameAnnouncement(`game over!`));
        store.dispatch(gameActions.setActivePlayer(null));
        store.dispatch(gameActions.setGameOver(true));
        await new Promise((r) => setTimeout(r, 1000));
        store.dispatch(gameActions.setShipHead(checkShipHead()));
      }
      return;
    }
    // Check SHIPHEAD
    if (checkShipHead()) {
      store.dispatch(gameActions.setGameAnnouncement(`game over!`));
      store.dispatch(gameActions.setActivePlayer(null));
      store.dispatch(gameActions.setGameOver(true));
      return setTimeout(() => {
        store.dispatch(gameActions.setShipHead(checkShipHead()));
      }, 1000);
    }
    // Check reverse
    if (checkReverse(cards, deckRef)) {
      store.dispatch(gameActions.changeDirection());
      store.dispatch(gameActions.setGameAnnouncement(`Switching direction!`));
    }

    // Switch Player
    let skip = 0;
    if (deckRef[cards[0]].power === "skip") {
      skip = cards.length;
    }
    if (skip) {
      store.dispatch(
        gameActions.setGameAnnouncement(
          `Skipping over ${skip} player${skip !== 1 ? "s" : ""}!`
        )
      );
    }
    store.dispatch(gameActions.switchActivePlayer(getNextPlayerId(skip)));
  });

  socket.on("takeStack", (player) => {
    store.dispatch(gameActions.takeStack(player.id));
    store.dispatch(gameActions.setGameEvent(`${player.name} has picked up!`));
    store.dispatch(gameActions.switchActivePlayer(getNextPlayerId()));
  });

  socket.on("takeFaceCards", (player) => {
    store.dispatch(gameActions.takeFaceCards(player.id));
  });

  socket.on("newGame", (info) => {
    store.dispatch(gameActions.newGame(info));
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
