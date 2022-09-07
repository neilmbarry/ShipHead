export const socketFunctions = (socket) => {
  socket.on("message", (message) => {
    console.warn(message);
  });
};
