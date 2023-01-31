import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deck: [],
  deckRef: {},
  stack: [],
  activePlayerId: null,
  gameOver: true,
  shipHead: null,
  directionClockwise: true,
  room: null,
  hostId: null,
  message: {
    event: "",
    announcement: "",
  },
  players: [],
};

// ADD CONNECTION STATUS

const setPlayersNewGame = (players) => {
  return players.map((player) => ({
    ...player,
    hasSetFaceUpCards: false,
    hasToPickUp: false,
    playing: true,
    handCards: [],
    faceUpCards: [],
    faceDownCards: [],
  }));
};

const gameSlice = createSlice({
  name: "gameState",
  initialState: { value: initialState },
  reducers: {
    resetGame: (state, action) => {
      state.value = initialState;
    },
    createRoom: (state, action) => {
      state.value.room = action.payload.room;
      state.value.hostId = action.payload.hostId;
      state.value.players = [
        {
          ...action.payload.playerInfo,
          playing: true,
          hasSetFaceUpCards: false,
          hasToPickUp: false,
          handCards: [],
          faceUpCards: [],
          faceDownCards: [],
        },
      ];
    },
    setRoom: (state, action) => {
      state.value.room = action.payload;
    },
    setGameState: (state, action) => {
      state.value = action.payload;
    },
    addPlayer: (state, action) => {
      state.value.players.push({
        ...action.payload,
        playing: true,
        hasSetFaceUpCards: false,
        hasToPickUp: false,
        handCards: [],
        faceUpCards: [],
        faceDownCards: [],
      });
    },
    removePlayer: (state, action) => {
      state.value.players = state.value.players.filter(
        (player) => player.id !== action.payload
      );
    },
    startGame: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload,
        shipHead: null,
        gameOver: false,
      };
    },
    dealCards: (state, action) => {
      state.value.players.forEach((player) => {
        player.faceDownCards = state.value.deck.splice(0, 3);
        player.handCards = state.value.deck.splice(0, 6);
      });
    },
    selectFaceUpCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.playerId
      );
      player.handCards = player.handCards.filter(
        (card) => !action.payload.cards.includes(card)
      );
      player.faceUpCards = action.payload.cards;
      player.hasSetFaceUpCards = true;
    },
    setActivePlayer: (state, action) => {
      state.value.activePlayerId = action.payload;
    },
    playCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.player.id
      );
      player[action.payload.hand] = player[action.payload.hand].filter(
        (card) => !action.payload.cards.includes(card)
      );
      state.value.stack.push(...action.payload.cards);
    },
    drawCard: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.id
      );
      // Take card from deck
      const newCards = state.value.deck.splice(0, action.payload.quantity);
      // Add card to players hand
      player.handCards.unshift(...newCards);
    },
    sortHandCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.id
      );
      player.handCards.sort(
        (a, b) =>
          action.payload.deckRef[a].worth - action.payload.deckRef[b].worth
      );
    },
    switchActivePlayer: (state, action) => {
      state.value.activePlayerId = action.payload;
    },
    takeStack: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload
      );
      // Add stack to players hand
      player.handCards.unshift(...state.value.stack);

      player.hasToPickUp = false;
      state.value.stack = [];
    },
    takeFaceCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload
      );
      player.handCards.unshift(...player.faceUpCards);
      player.faceUpCards = [];
    },
    hasToPickUp: (state, action) => {
      state.value.players.find(
        (player) => player.id === action.payload
      ).hasToPickUp = true;
    },
    burnStack: (state) => {
      state.value.stack = [];
    },
    changeDirection: (state, action) => {
      state.value.directionClockwise = !state.value.directionClockwise;
    },
    setWinner: (state, action) => {
      state.value.players.find(
        (player) => player.id === action.payload
      ).playing = false;
    },
    setShipHead: (state, action) => {
      state.value.shipHead = action.payload;
    },
    setGameOver: (state) => {
      state.value.gameOver = true;
    },
    setGameEvent: (state, action) => {
      state.value.message.event = action.payload;
    },
    setGameAnnouncement: (state, action) => {
      state.value.message.announcement = action.payload;
    },
    newGame: (state, action) => {
      state.value = {
        ...initialState,
        ...action.payload,
        gameOver: false,
        room: state.value.room,
        hostId: state.value.hostId,
        players: setPlayersNewGame(state.value.players),
      };
    },
  },
});

export default gameSlice.actions;

export const gameReducer = gameSlice.reducer;
