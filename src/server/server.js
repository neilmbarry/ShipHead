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

io.on("connection", (socket) => {
  console.log("New User connected");
  console.log(socket.rooms);

  // Just to 1 user
  socket.emit("message", `[SERVER] You have connected`);

  socket.emit("message", socket.handshake.query.t);

  socket.emit("userID", [...socket.rooms][0]);

  // To everyone but 1 user

  socket.broadcast.emit(
    "message",
    `[SERVER] A user NEW has joined: ${socket.handshake.query.t}`
  );

  socket.on("disconnect", (info) => {
    console.log("A User DISCONNECT XXXXXXXXXXXXXXXXX", info.client);
    // To everyone
    io.emit("message", "[SERVER] A user has left the chat");
  });

  // socket.on("message", (message) => {
  //   // when receiving message, emits message to everyone
  //   io.emit("message", message);
  //   console.log(message);
  // });

  socket.on("groupChat", (message) => {
    socket.broadcast.emit("groupChat", message);
  });

  socket.on("joinRoom", (room) => {
    console.log("Someone has joined room: ", room);
    socket.join(room);
  });

  socket.on("leaveRoom", (room) => {
    console.log("Someone has left room: ", room);
    socket.leave(room);
  });

  socket.on("addPlayer", (data) => {
    console.log(`Adding player '${data.name}' to room: '${data.room}'`);
    io.in(data.room).emit("addPlayer", data);
  });
  socket.on("getGameState", (room) => {
    console.log("getting game state");
    socket.to(room).emit("shareGameState");
    // const clients = io.sockets.adapter.rooms.get(data.room);
    // const numClients = clients ? clients.size : 0;
    // console.log(data, "<=== DATA");
    // if (numClients === 1) {
    //   console.log("first client in room");
    //   return io.in(data.room).emit("addPlayer", data);
    // }
    // console.log("NOT THE FIRST");

    // console.log(`'${data.name}' is requesting state data`);
    // socket.to(data.room).emit("shareGameState", data.name);
    // socket.to(data.room).emit("shareGameState", data.newPlayer);
  });
  socket.on("setGameState", (state) => {
    console.log(state);
    console.log(`Sending state to all users`);
    io.in(state.room).emit("setGameState", state);
    // console.log(
    //   `Adding player '${data.newPlayer}' to room: '${data.state.room}'`
    // );
    // io.in(data.state.room).emit("addPlayer", {
    //   room: data.state.room,
    //   name: data.newPlayer,
    // });

    // io.emit("setGameState", state);
  });

  socket.on("readyPlayer", (info) => {
    io.in(info.room).emit("readyPlayer", info.playerNumber);
  });

  socket.on("title", (message) => {
    // when receiving title, emits title to everyone
    io.emit("title", message);
  });

  socket.on("dealCards", (info) => {
    io.in(info.room).emit("dealCards", info.deck);
  });

  socket.on("setFaceUpCards", ({ cards, player, room }) => {
    io.in(room).emit("setFaceUpCards", { cards, player });
  });

  socket.on("pickUpStack", (info) => {
    io.in(info.room).emit("pickUpStack", info.playerNumber);
  });

  socket.on("playCards", (data) => {
    io.in(data.room).emit("playCards", data);
  });
  socket.on("sortCards", (player) => {
    io.emit("sortCards", player);
  });
  socket.on("drawCardsFromDeck", (info) => {
    io.in(info.room).emit("drawCardsFromDeck", info.playerNumber);
  });
  socket.on("reset", () => {
    io.emit("reset");
  });
  socket.on("newGame", () => {
    io.emit("newGame");
  });
});

// io.on("message", (message) => {
//   console.log(message);
// });

server.listen(process.env.PORT || 4000, function () {
  console.log("listening on port 4000");
});
