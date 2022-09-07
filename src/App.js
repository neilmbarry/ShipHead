import { useEffect } from "react";
import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSocket } from "./context/SocketProvider";
import Game from "./pages/Game/Game";
import store from "./redux/store";
import gameActions from "./redux/gameSlice";
import userActions from "./redux/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkBurnStack, gameState } from "./gameLogic/gameLogic";
import { socketFunctions } from "./context/SocketFunctions";

function App() {
  const socket = useSocket();
  // const gameState = useSelector((state) => state.game.value);
  // console.log("CONSOLE LOG OF GAMESTATE VARIABLE IN APP COMPONENT", gameState);
  console.log("App has rendered.");
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
    //Set user room Id to player id in UserSlice

    socketFunctions(socket);

    // socket.on("message", (message) => {
    //   console.warn(message);
    // });

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
      console.log("RECEIVED STATE!");
      store.dispatch(gameActions.setGameState(state));
    });

    socket.on("addPlayer", (player) => {
      console.log("New Player has joined: ", player.name);
      store.dispatch(gameActions.addPlayer(player));
    });

    socket.on("removePlayer", (playerId) => {
      store.dispatch(gameActions.removePlayer(playerId));
    });

    socket.on("startGame", (deck) => {
      navigate("/game");
      store.dispatch(gameActions.startGame(deck));
      setTimeout(() => {
        store.dispatch(gameActions.dealCards());
      }, 3000);
    });

    socket.on("setFaceUpCards", ({ cards, playerId }) => {
      store.dispatch(gameActions.selectFaceUpCards({ cards, playerId }));
    });

    socket.on("playCards", ({ cards, playerId }) => {
      const legalMove = true;
      store.dispatch(gameActions.playCards({ cards, playerId }));
      // Check legal move
      // UNDO EVERYTHING BELOW
      // if (!legalMove) {
      //   return store.dispatch(gameActions.hasToPickUp(playerId));
      // }
      // // Check Burn
      // if (checkBurnStack()) {
      //   store.dispatch(gameActions.burnStack());
      // }
      // // Check draw cards
      // if (checkDrawCards()) {
      //   store.dispatch(gameActions.drawCard());
      // }
      // Check winner
      // Check SHIPHEAD
      // Check reverse
      // Switch Player
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
    return () => socket.disconnect();
  }, [socket]);
  useEffect(() => {});
  return (
    <div className={classes.app}>
      {/* <Router> */}
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Home />} />
        </Route>
        {/* <Route path="/join/:roomId" element={<Join />} /> */}
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
