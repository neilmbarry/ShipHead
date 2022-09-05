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

function App() {
  const socket = useSocket();

  const gameState = useSelector((state) => state.game.value);
  console.log("CONSOLE LOG OF GAMESTATE VARIABLE IN APP COMPONENT", gameState);
  useEffect(() => {
    if (!socket) return;
    //Set user room Id to player id in UserSlice

    socket.on("userID", (userID) => {
      console.log(userID);
      store.dispatch(userActions.setId(userID));
    });

    socket.on("shareGameState", () => {
      console.log("Sharing state ", gameState);
      socket.emit("setGameState", {
        room: gameState.room,
        state: gameState,
      });
    });

    socket.on("setGameState", (state) => {
      console.log("RECEIVED STATE!");
      store.dispatch(gameActions.setGameState(state));
    });

    // socket.on("shareGameState", (newPlayer) => {
    //   console.log("Sharing game state");

    //   // socket.to(room).emit("setGameState", getGameState());

    //   socket.emit("setGameState", { state: getGameState(), newPlayer });
    // });

    // socket.on("setGameState", (state) => {
    //   console.log("setting game state");
    //   console.log(state);
    //   setAppState(state);
    //   // setPlayer();
    // });

    // socket.on("message", (message) => {
    //   console.warn("CLIENT", message);
    //   // return;
    // });
    // socket.on("groupChat", (message) => {
    //   console.log("Someone else: ", message);
    //   // return;
    // });
    // socket.on("addPlayer", (player) => {
    //   console.log("New Player has joined: ", player.name);
    //   addNewPlayer(player);
    // });
    // socket.on("dealCards", (deck) => {
    //   console.log("Dealing Cards");
    //   startGame(deck);
    // });
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
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/:roomId" element={<Home />} />
          </Route>
          {/* <Route path="/join/:roomId" element={<Join />} /> */}
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
