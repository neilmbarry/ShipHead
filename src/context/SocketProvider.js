import { useContext, useEffect, useState, createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

let server;

if (process.env.NODE_ENV === "development") {
  server = "http://localhost:4000/";
} else {
  server = "https://shit-head-heroku.herokuapp.com/";
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  useEffect(() => {
    console.log("CONNECTING...");
    const newSocket = io(server);
    setSocket(newSocket);
    return () => {
      console.log("DISCONNECTING");
      newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
