export function generateDeck(suits, cardValues, powerCards, reverseCards) {
  const deck = [];
  const deckReference = {};
  suits.forEach((suit) => {
    cardValues.forEach((value) => {
      const power = Object.entries(powerCards).find(
        (entry) => entry[1] === value[0]
      );
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
  console.log("Deck generated.");
  console.log(deck, deckReference);
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
