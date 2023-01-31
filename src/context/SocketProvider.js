import { useContext, useEffect, useState, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

let server;

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to development server...");
  server = "http://localhost:4000/";
} else {
  server = "https://ship-head.herokuapp.com/";
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  useEffect(() => {
    console.log("CONNECTING...");
    const newSocket = io(server);
    setSocket(newSocket);
    return () => {
      console.error("DISCONNECTING");
      newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
