import { createSlice } from "@reduxjs/toolkit";

const userStateTemplate = {
  name: "Neil",
  id: "sfji4jije34i3",
  avatar: "avatar1",
  notification: {
    type: "warning",
    message: "It's not your turn",
  },
  selectedCards: [],
};

const initialState = {
  name: null,
  id: null,
  avatar: null,
  notification: {
    type: "",
    message: "",
  },
  selectedCards: [],
};

const userSlice = createSlice({
  name: "userState",
  initialState: { value: userStateTemplate },
  reducers: {
    setNotification: (state, action) => {
      state.value.notification = action.payload;
    },
    setSelecteCards: (state, action) => {
      state.value.selectedCards = action.payload;
    },
    setAvatar: (state, action) => {
      state.value.avatar = action.payload;
    },
    setId: (state, action) => {
      state.value.id = action.payload;
    },
    setName: (state, action) => {
      state.value.name = action.payload;
    },
  },
});

export const { setNotification, setSelecteCards, setAvatar, setId, setName } =
  userSlice.actions;

export default userSlice.reducer;
