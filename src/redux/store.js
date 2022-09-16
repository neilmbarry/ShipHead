import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameSlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export default store;
