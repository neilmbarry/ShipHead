import { useEffect } from "react";
import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game/Game";

function App() {
  useEffect(() => {
    //Set user room Id to player id in UserSlice
  });
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
