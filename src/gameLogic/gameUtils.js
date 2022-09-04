import {
  suits,
  cardValues,
  powerCards,
  reverseCards,
} from "../config/initialCardValues";

export function generateDeck() {
  // Create a deck to use in state, and deckRef to hold info about values, powers etc.
  const deck = [];
  const deckReference = {};

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
      deckReference[value[0] + suit] = {
        power: power ? power[0] : false,
        worth: power ? 15 : value[1],
        reverse: reverse ? true : false,
      };
    });
  });
  return [deck, deckReference];
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

const allCardsHaveEqualValue = (cards, deckRef) => {
  return cards.every((card) => deckRef[card].value === deckRef[cards[0]].value);
};

const cardsWillReverseDirection = (cards, deckRef) => {
  if (!deckRef(cards[0]).reverse) return false;
  if (cards.length % 2 === 1) return true;
  return false;
};
