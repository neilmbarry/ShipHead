import { useEffect } from "react";
import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSocket } from "./context/SocketProvider";
import Game from "./pages/Game/Game";

import { socketFunctions } from "./context/SocketFunctions";

function App() {
  const socket = useSocket();
  console.log("App has rendered.");

  useEffect(() => {
    if (!socket) return;
    socketFunctions(socket);
    return () => {
      console.error("DISCONNECTED");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className={classes.app}>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<Home />} />
        </Route>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
