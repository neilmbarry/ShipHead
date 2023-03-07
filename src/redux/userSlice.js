import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  id: "",
  avatar: null,
  notification: null,
  modal: { type: "connecting" },
  selectedCards: [],
};

const userSlice = createSlice({
  name: "userState",
  initialState: { value: initialState },
  reducers: {
    setNotification: (state, action) => {
      state.value.notification = action.payload;
    },
    setModal: (state, action) => {
      state.value.modal = action.payload;
    },

    setSelectedCards: (state, action) => {
      state.value.selectedCards = action.payload;
    },
    setInfo: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
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

export default userSlice.actions;

export const userReducer = userSlice.reducer;
