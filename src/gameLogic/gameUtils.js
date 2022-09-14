import {
  suits,
  cardValues,
  powerCards,
  reverseCards,
  numbersSpelled,
} from "../config/initialCardValues";

export function generateDeck() {
  // Create a deck to use in state, and deckRef to hold info about values, powers etc.
  const deck = [];
  const deckRef = {};

  suits.forEach((suit) => {
    cardValues.forEach((value) => {
      // Check if card is a power
      const power = Object.entries(powerCards).find(
        (entry) => entry[1] === value[0]
      );
      // Check if card is a reverse
      const reverse = Object.entries(reverseCards).find(
        (entry) => entry[1] === value[0]
      );
      deck.push(value[0] + suit);
      deckRef[value[0] + suit] = {
        power: power ? power[0] : false,
        worth: power ? 15 + value[1] : value[1],
        reverse: reverse ? true : false,
        name: value[0],
      };
    });
  });
  return { deck: shuffleDeck(deck), deckRef };
}

export function shuffleDeck(deck) {
  let shuffledDeck = [...deck];
  let currIndex = shuffledDeck.length;
  let randomIndex;
  while (currIndex > 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    [shuffledDeck[currIndex], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[currIndex],
    ];
  }
  console.log("Deck shuffled.");
  return shuffledDeck;
}

export const allCardsHaveEqualValue = (cards, deckRef) => {
  if (cards.length === 0) return;
  return cards.every((card) => deckRef[card].worth === deckRef[cards[0]].worth);
};

export const cardsWillReverseDirection = (cards, deckRef) => {
  if (!deckRef(cards[0]).reverse) return false;
  if (cards.length % 2 === 1) return true;
  return false;
};

export const sortCards = (cards, deckRef) => {
  return cards.sort((a, b) => deckRef[a].worth - deckRef[b].worth);
};

export const cardsToText = (cards, deckRef) => {
  const cardsLength = cards.length;
  const name = deckRef[cards[0]].name;
  let article = "a";
  let end = "";
  if (cards[0][0] === "8" || cards[0][0] === "A") {
    article = "an";
  }
  if (cardsLength > 1) {
    article = cardsLength;
    end = "s";
    if (name === "6") {
      end = "es";
    }
  }

  const text = `${article} ${numbersSpelled[name]}${end}`;
  return text;
};
