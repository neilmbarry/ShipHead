import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import Lobby from "./pages/Lobby/Lobby";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game/Game";

function App() {
  return (
    <div className={classes.app}>
      <Router>
        <Routes>
          <Route path="/lobby/:id" element={<Lobby />} />
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
