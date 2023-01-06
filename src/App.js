// Main imports
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Server Functions
import { useSocket } from "./context/SocketProvider";
import { socketFunctions } from "./context/SocketFunctions";

// Styles
import classes from "./App.module.css";
import { AnimatePresence } from "framer-motion";

// Components
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Lobby from "./pages/Lobby/Lobby";
import Notification from "./components/UI/Notification";
import Modal from "./components/UI/Modal";

function App() {
  const socket = useSocket();
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;
    socketFunctions(socket);
    return () => {
      console.error("DISCONNECTED");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={classes.app}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/:roomId" element={<Home />} />
          </Route>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </AnimatePresence>
      <Notification />
      <Modal />
    </div>
  );
}

export default App;
