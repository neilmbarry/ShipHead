import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { useSocket } from "./context/SocketProvider";
import { socketFunctions } from "./context/SocketFunctions";
import store from "./redux/store";
import userActions from "./redux/userSlice";

import classes from "./App.module.css";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Lobby from "./pages/Lobby/Lobby";
import Notification from "./components/UI/Notification";
import Modal from "./components/UI/Modal";

function App() {
  const socket = useSocket();
  const notification = useSelector((state) => state.user.value.notification);
  const modal = useSelector((state) => state.user.value.modal);
  const location = useLocation();

  const modalJSX = (
    <Modal
      type={modal?.type}
      show={modal}
      modal={modal}
      onClose={() => store.dispatch(userActions.setModal(null))}
    />
  );

  const notificationJSX = (
    <Notification
      notification={notification}
      show={notification}
      onClose={() => store.dispatch(userActions.setNotification(null))}
    />
  );

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
      {notificationJSX}
      {modalJSX}
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
    </div>
  );
}

export default App;
