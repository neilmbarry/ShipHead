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

---

## How the application works

Upon opening this application, a user will be prompted to select an avatar and choose a name. The user can then either select to play against a number of opponents either human or computer.

A game is created by the user and ....

The rules for the game can be found in the application itself.

During a game the flow of information is as follows:
First a player selects the card(s) they wish to play. This choice is passed through a validator that checks:

1. If it is the players turn.
2. If the card selected is in the available array of cards.
3. If the card selected is a valid move given the current state of the game in play.

If these conditions are met, the client will emit that their move to the server, where it will then broadcast to everyone in the given room. This will update all clients local state. The updated state will then update to UI and set the next player to act as active. This flow will continue until the end of the game where players can either selected to play again or to exit to the main menu.

---

## Code Structure

This application can be divided into three distinct parts: game logic, user interface, server connection. Below is a sample of each.

![Game Preview](https://i.imgur.com/OW8f9td.png)
![Game Preview](https://i.imgur.com/OW8f9td.png)
![Game Preview](https://i.imgur.com/OW8f9td.png)
