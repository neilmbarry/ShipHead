import { useContext, useEffect, useState, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

let server;

if (process.env.NODE_ENV === "development") {
  console.warn("Connecting to development server...");
  // CHANGE TO LOCALHOST
  server = "http://neils-macbook-pro.local:4000/";
  server = "http://localhost:4000/";
} else {
  console.warn("Connecting to production server...");
  server = "https://ship-head.herokuapp.com/";
}

export function SocketProvider({ id, children }) {
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
