import { useEffect } from "react";
import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSocket } from "./context/SocketProvider";
import Game from "./pages/Game/Game";
import Notification from "./components/UI/Notification";
import { useLocation } from "react-router-dom";

import { socketFunctions } from "./context/SocketFunctions";
import { useSelector } from "react-redux";
import store from "./redux/store";
import userActions from "./redux/userSlice";
import { AnimatePresence } from "framer-motion";

function App() {
  const socket = useSocket();
  console.log("App has rendered.");
  const notification = useSelector((state) => state.user.value.notification);
  const location = useLocation();

  useEffect(() => {
    if (!socket) return;
    socketFunctions(socket);
    return () => {
      console.error("DISCONNECTED");
      socket.disconnect();
    };
  }, [socket]);

  const showNotification = notification && (
    <Notification
      notification={notification}
      onClose={() => store.dispatch(userActions.setNotification(null))}
    />
  );

  return (
    <div className={classes.app}>
      {showNotification}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/:roomId" element={<Home />} />
          </Route>
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
