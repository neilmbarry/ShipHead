import { createSlice } from "@reduxjs/toolkit";

const gameStateTemplate = {
  deck: [
    "1",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "10",
    "123",
    "134",
    "145",
    "156",
    "167",
    "178",
    "189",
  ],
  stack: ["KingSpades", "QueenHearts", "3Diamonds"].reverse(),
  activePlayerId: "4mfljfad9",
  gameOver: false,
  shipHead: null,
  directionClockwise: true,
  hostId: "sfji4jije34i3",
  room: "xxuehfidfjdfk",
  message: {
    gameEvent: "Rupert has played a King!",
    gameAnnouncement: "such savagery!!",
  },
  players: [
    {
      id: "ir3jojfir",
      name: "Rupert",
      avatar: "avatar3",
      handCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      faceUpCards: ["8Spades", "8Clubs", "10Clubs"],
      faceDownCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      playing: true,
      hasSetFaceUpCards: true,
      hasToPickUp: false,
    },
    {
      id: "4mfljfad9",
      name: "Sam",
      avatar: "avatar6",
      handCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      faceUpCards: ["2Hearts", "5Hearts", "5Diamonds"],
      faceDownCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      playing: true,
      hasSetFaceUpCards: true,
      hasToPickUp: false,
    },
    {
      id: "sfji4jije34i3",
      name: "Neil",
      avatar: "avatar1",
      handCards: ["4Spades", "9Hearts", "2Diamonds"],
      faceUpCards: ["5Clubs", "10Diamonds", "AceHearts"],
      faceDownCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      playing: true,
      hasSetFaceUpCards: true,
      hasToPickUp: false,
    },
    {
      id: "dei3309de",
      name: "Regina",
      avatar: "avatar2",
      handCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      faceUpCards: ["AceSpades", "KingClubs", "QueenClubs"],
      faceDownCards: ["KingSpades", "QueenHearts", "3Diamonds"],
      playing: true,
      connected: true,
      hasSetFaceUpCards: true,
      hasToPickUp: false,
    },
  ],
};

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
  return (
    players
      // .filter((player) => player.playing)
      .map((player) => ({
        ...player,
        hasSetFaceUpCards: false,
        hasToPickUp: false,
        // remove
        playing: true,
        handCards: [],
        faceUpCards: [],
        faceDownCards: [],
      }))
  );
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
