const app = require("express")();

const server = require("http").createServer(app);

let origin;

if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
  console.log("Connecting to development project");
} else {
  origin = "https://shot-head-react.vercel.app";
  console.log("Connecting to production project");
}
const io = require("socket.io")(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
  },
});

app.get("/", function (req, res) {
  res.send("<h1>Ship Head is Ready!</h1>");
});
console.log("-------------RESET------------");

io.on("connection", (socket) => {
  console.log("New User connected: ", socket.id);

  // Just to 1 user
  socket.emit("message", `You have connected (${socket.id})`);
  socket.emit("userID", socket.id);

  socket.broadcast.emit(
    "message",
    `[SERVER] A user NEW has joined: ${socket.handshake.query.t}`
  );

  socket.on("disconnecting", () => {
    console.log(socket.id, " is disconnecting. Rooms are: ", socket.rooms);
    io.emit("message", "A player is disconnecting...");
    io.emit("removePlayer", socket.id);
  });

  socket.on("disconnect", (info) => {
    console.log("A User DISCONNECT XXXXXXXXXXXXXXXXX");
  });

  socket.on("groupChat", (message) => {
    socket.broadcast.emit("groupChat", message);
  });

  socket.on("joinRoom", ({ roomId, player }) => {
    console.log(`${player.name} has joined room: `, roomId);
    socket.join(roomId);
    socket.to(roomId).emit("message", `${player.name} has joined the room.`);
    socket.in(roomId).emit("shareGameState", player);
  });

  socket.on("setGameState", ({ state, newPlayer }) => {
    console.log(`Sending state to all users`);
    io.in(state.room).emit("setGameState", state);
    io.in(state.room).emit("addPlayer", newPlayer);
  });

  socket.on("leaveRoom", (room) => {
    console.log("Someone has left room: ", room);
    socket.leave(room);
  });

  socket.on("addPlayer", ({ player, roomId }) => {
    console.log(`Adding player '${player.name}' to room: '${roomId}'`);
    console.log("about to emit addplayer from server");

    io.to(roomId).emit("addPlayer", player);
  });

  socket.on("startGame", (info) => {
    console.log("STARTING GMAE", info.room);
    io.to(info.room).emit("startGame", info);
  });

  socket.on("setFaceUpCards", ({ cards, playerId, room }) => {
    io.in(room).emit("setFaceUpCards", { cards, playerId });
  });

  socket.on("setActivePlayer", ({ id, roomId }) => {
    io.in(roomId).emit("setActivePlayer", id);
  });

  socket.on("playCards", (data) => {
    io.in(data.room).emit("playCards", {
      cards: data.cards,
      playerId: data.playerId,
      hand: data.hand,
    });
  });

  //--------- BELOW IS SHITE -----------//

  // socket.on("dealCards", (info) => {
  //   io.in(info.room).emit("dealCards", info.deck);
  // });

  // socket.on("pickUpStack", (info) => {
  //   io.in(info.room).emit("pickUpStack", info.playerNumber);
  // });

  // socket.on("sortCards", (player) => {
  //   io.emit("sortCards", player);
  // });
  // socket.on("drawCardsFromDeck", (info) => {
  //   io.in(info.room).emit("drawCardsFromDeck", info.playerNumber);
  // });
  // socket.on("reset", () => {
  //   io.emit("reset");
  // });
  // socket.on("newGame", () => {
  //   io.emit("newGame");
  // });
});

// io.on("message", (message) => {
//   console.log(message);
// });

server.listen(process.env.PORT || 4000, function () {
  console.log("listening on port 4000");
});
