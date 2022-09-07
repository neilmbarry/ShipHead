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
} from "../gameLogic/gameLogic";

export const socketFunctions = (socket) => {
  socket.on("message", (message) => {
    console.warn(message);
  });

  socket.on("userID", (userID) => {
    console.log(userID);
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
    setTimeout(() => {
      store.dispatch(gameActions.dealCards());
    }, 1000);
  });

  socket.on("setFaceUpCards", ({ cards, playerId }) => {
    store.dispatch(gameActions.selectFaceUpCards({ cards, playerId }));
  });

  socket.on("setActivePlayer", (id) => {
    console.log("setting active player", id);
    store.dispatch(gameActions.setActivePlayer(id));
  });

  socket.on("playCards", ({ cards, playerId, hand }) => {
    console.log("RECEIVED PLAY CARDS", cards);
    const legalMove = checkLegalMove(cards);
    console.log(legalMove && "LEGAL MOVE");
    store.dispatch(gameActions.playCards({ cards, playerId, hand }));
    // Check legal move
    if (!legalMove) {
      return store.dispatch(gameActions.hasToPickUp(playerId));
    }
    console.log("THIS FAR");
    // Check Burn
    if (checkBurnStack()) {
      store.dispatch(gameActions.burnStack());
    }
    // // Check draw cards
    console.log("THIS FAR");
    if (checkDrawCards(playerId)) {
      store.dispatch(
        gameActions.drawCard({
          id: playerId,
          quantity: checkDrawCards(playerId),
        })
      );
    }
    console.log("THIS FAR");
    // Check winner
    if (checkWinner(playerId)) {
      store.dispatch("setWinner", {
        playerId,
      });
    }
    console.log("THIS FAR");
    // Check SHIPHEAD
    // Check reverse
    // Switch Player
    store.dispatch(gameActions.switchActivePlayer(getNextPlayerId()));
    console.log("THIS FAR");
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
