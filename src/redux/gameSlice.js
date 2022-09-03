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
  room: "xxuehfidfjdfk",
  // playerInfo: {
  //   name: "Neil",
  //   avatar: "avatar1",
  //   id: "djn48dsh80",
  // },
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
  stack: [],
  activePlayerId: null,
  gameOver: true,
  shipHead: null,
  directionClockwise: true,
  room: null,
  playerInfo: {
    name: null,
    avatar: null,
    id: null,
  },
  message: {
    gameEvent: "",
    gameAnnouncement: "",
  },
  players: [],
};

// ADD CONNECTION STATUS

const setPlayersNewGame = (players) => {
  return players.map((player) => ({
    name: player.name,
    id: player.id,
    avatar: player.avatar,
    playing: true,
    hasSetFaceUpCards: false,
    hasToPickUp: false,
  }));
};

const gameSlice = createSlice({
  name: "gameState",
  // initialState: { value: initialState },
  initialState: { value: gameStateTemplate },
  reducers: {
    reset: (state, action) => {
      state.value = initialState;
    },
    newGame: (state, action) => {
      state.value = {
        ...state.value,
        deck: [],
        stack: [],
        activePlayerId: null,
        gameOver: true,
        shipHead: null,
        directionClockwise: true,
        message: {
          gameEvent: "",
          gameAnnouncement: "",
        },
        players: setPlayersNewGame(state.value.players),
      };
    },
    setGameState: (state, action) => {
      state.value = action.payload;
    },
    //---PROBABLY REMOVE---//
    setPlayerInfo: (state, action) => {
      state.value.playerInfo = action.payload;
    },
    //-----------------//
    addPlayer: (state, action) => {
      state.value.players.push({
        ...action.payload,
        // name: action.payload.name,
        // avatar: action.payload.avatar,
        // id: action.payload.id,
        playing: true,
        hasSetFaceUpCards: false,
        hasToPickUp: false,
      });
    },
    removePlayer: (state, action) => {
      state.value.players = state.value.players.filter(
        (player) => player.id !== action.payload
      );
    },
    setDeck: (state, action) => {
      state.value.deck = action.payload;
    },
    dealCards: (state, action) => {
      state.value.gameOver = false;
      state.value.players.forEach((player) => {
        player.faceDownCards = state.value.deck.splice(0, 3);
        player.handCards = state.value.deck.splice(0, 6);
      });
    },
    selectFaceUpCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.id
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
    playCard: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.playerId
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
    switchActivePlayer: (state, action) => {
      state.value.activePlayerId = action.payload;
    },
    // REMOVE (ONLY CHANGES UI)
    // sortHandCards: (state, action) => {
    //   const player = state.value.players.find(
    //     (player) => player.id === action.payload.id
    //   );
    //   player.inHandCards.sort((a, b) => a.worth - b.worth);
    // },
    takeStack: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.id
      );
      // Add stack to players hand
      player.handCards.unshift(...state.value.stack);
      // LOGIC TO BE MOVED TO GAMELOGIC
      //   if (player.faceUpCards.length === 1) {
      //     console.log("taking 1 faceupcard");
      //     player.inHandCards.unshift(player.faceUpCards.pop());
      //   } else if (
      //     player.faceUpCards.every(
      //       (card) => card.value === player.faceUpCards[0].value
      //     )
      //   ) {
      //     console.log("taking all faceupcards");
      //     player.inHandCards.unshift(...player.faceUpCards);
      //     player.faceUpCards = [];
      //   }
      // Reset stack
      player.hasToPickUp = false;
      state.value.stack = [];
    },
    takeFaceUpCards: (state, action) => {
      const player = state.value.players.find(
        (player) => player.id === action.payload.id
      );
      player.handCards.unshift(...player.faceUpCards);
    },
    hasToPickUp: (state, action) => {
      state.value.players.find(
        (player) => player.id === action.payload.id
      ).hasToPickUp = true;
    },
    burnStack: (state) => {
      state.value.stack = [];
    },
    changeDirection: (state, action) => {
      state.value.direction = action.payload;
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
    setRoom: (state, action) => {
      state.value.room = action.payload;
    },
    setGameEvent: (state, action) => {
      state.value.message.gameEvent = action.payload;
    },
    setGameAnnouncement: (state, action) => {
      state.value.message.gameAnnouncement = action.payload;
    },
  },
});

export const {
  reset,
  newGame,
  drawCard,
  playCard,
  takeStack,
  dealCards,
  selectFaceUpCards,
  setDeck,
  addPlayer,
  setActivePlayer,
  burnStack,
  switchActivePlayer,
  changeDirection,
  setWinner,
  removePlayer,
  hasToPickUp,
  setGameState,
  setCurrentPlayer,
  setShipHead,
  setGameOver,
  setRoom,
  setPlayerInfo,
  takeFaceUpCards,
} = gameSlice.actions;

export default gameSlice.reducer;
