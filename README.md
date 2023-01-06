# Ship-Head!

A live card game utilizing React.js on the front end, and an Express server with socket.io on the back end. Users can play games against up to three other players, or against the computer.

Ship-Head! is a simple card game based of a popular game with a similar name. You can play against the computer or live with a friend using a socket.io connection. The game state is managed using redux on the client’s end, using game logic to validate a given move before emitting to the server and the other clients in a given room.

![Game Preview](https://i.imgur.com/OW8f9td.png)

---

## Features

- Users can choose their name and select an avatar
- Play against up to 3 opponents
- Interactive animations for a smooth playing experience
- Helper messages to guide you through the game
- Optimized to be played on mobile devices

![User Features](https://i.imgur.com/OW8f9td.png)

![Admin Features](https://i.imgur.com/OW8f9td.png)

#### There are 3 admin levels:

- **Helper:** Can delete chat messages
- **Moderator:** The above plus the ability to kick and ban users
- **Administrator:** All the above plus send global alerts and promote/demote users

---

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## Usage

After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:3000

To give yourself administrator permissions on the chat, you will have to type `/role [your-name]` in the app console.

---
