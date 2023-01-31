# Ship-Head!

Ship-Head is a live card game utilizing React.js on the front end, and an Express server with socket.io on the back end. Users can play games against up to three other players, or against the computer.

A live demo can be played [here](https://ship-head.vercel.app/)

![Game Preview](https://i.imgur.com/OW8f9td.png)

---

## Features

- Users can choose their name and select an avatar
- Play against up to 3 opponents
- Interactive animations
- Helper messages to guide you through the game
- Optimized to be played on mobile devices

---

## How the application works

The rules for the game can be found in the application itself.

Upon opening this application, a user will be prompted to select an avatar and choose a name. The user can then either select to play against a number of opponents either human or computer.

A game (room) is created by the user and will either begin immediately if playing the computer, or manually once the desired amount of players have joined the lobby.

During a game the typical flow of information is as follows:
A player selects the card(s) they wish to play. This choice is passed through a validator that checks:

1. If it is the player's turn (active).
2. If the card selected is in the available array of cards.
3. If the card selected is a valid move given the current state of the game in play.

If these conditions are met, the client will emit that their move to the server, where it will then broadcast to everyone in the given room. This will update all clients local state. The updated state will then render changes to the UI and set the next player to act as active. This flow will continue until the end of the game where players can either selected to play again or to exit to the main menu.

---

## Code Structure

This application can be divided into three distinct parts: game logic, user interface, socket functions (server). Below is an example of each.

![Game Logic Preview](https://i.imgur.com/A0zXhvp.png)
![User Interface Preview](https://i.imgur.com/W9j6KYE.png)
![Socket Function Preview](https://i.imgur.com/9w8tDJE.png)

---

## To run locally

- Clone repository to your local device
- Navigate to the ship-head folder
- Run npm install to install all the dependencies
- Run npm run dev:server to run the development server that the main application will connect to.
- Run npm start to start the React project, this will open in a new browser window.

---
