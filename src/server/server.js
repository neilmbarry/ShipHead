const app = require("express")();

const server = require("http").createServer(app);

let origin;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
  console.log("Connecting to development project");
} else {
  origin = "https://ship-head.vercel.app";
  console.log("Connecting to production project");
}
const io = require("socket.io")(server, {
  cors: {
    origin,
    methods: ["GET", "POST"],
  },
});

// var http = require("http");
// setInterval(function () {
//   http.get("https://ship-head.herokuapp.com/");
// }, 2700000);

app.get("/", function (req, res) {
  res.json({
    connected: true,
  });
});

io.on("connection", (socket) => {
  console.log("New User connected: ", socket.id);

  // Just to 1 user
  socket.emit("message", `You have connected (${socket.id})`);
  socket.emit("connection", socket.id);
  socket.emit("userID", socket.id);

  socket.broadcast.emit("message", `A new user has joined: ${socket.id}`);

  socket.on("disconnecting", () => {
    console.log(socket.id, " is disconnecting. Rooms are: ", socket.rooms);
    io.emit("message", "A player is disconnecting...");
    io.emit("removePlayer", socket.id);
  });

  socket.on("disconnect", (info) => {
    console.log("A user disconnected");
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

  socket.on("setActivePlayer", ({ player, roomId }) => {
    io.in(roomId).emit("setActivePlayer", player);
  });

  socket.on("playCards", (data) => {
    io.in(data.room).emit("playCards", {
      cards: data.cards,
      player: data.player,
      hand: data.hand,
      deckRef: data.deckRef,
    });
  });

  socket.on("takeStack", ({ player, room }) => {
    io.in(room).emit("takeStack", player);
  });

  socket.on("takeFaceCards", ({ player, room }) => {
    console.log("sending take face cards");
    io.in(room).emit("takeFaceCards", player);
  });

  socket.on("newGame", ({ room, info }) => {
    io.in(room).emit("newGame", info);
  });
});

server.listen(process.env.PORT || 4000, function () {
  console.log("listening on port 4000");
});
