export function generateDeck(suits, cardValues, powerCards, reverseCards) {
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
  // console.log("Deck generated.");
  // console.log(deck, deckReference);
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

const getTopStackCard = (stack) => {
  return stack[stack.length - 1];
};

const allCardsHaveEqualValue = (cards, deckRef) => {
  return cards.every((card) => deckRef[card].value === deckRef[cards[0]].value);
};

export function checkLegalMove(cards, stack, deckRef) {
  // Check if there are no cards or multiple different valued cards [played]
  if (cards.length === 0 || !allCardsHaveEqualValue(cards, deckRef))
    return false;
  // Check if there is an empty stack
  if (stack.length === 0) return true;
  // Check if it's a four of a kind [played]
  if (allCardsHaveEqualValue(cards, deckRef) && cards.length === 4) {
    return true;
  }
  // Set Player and Stack card info for comparison
  const topStackCardInfo = deckRef[getTopStackCard(stack)];
  const playedCardInfo = deckRef[cards[0]];
  // Check if playing a power card
  if (playedCardInfo.power) {
    return true;
  }
  // Check if played card is of greater or equal value
  if (playedCardInfo.worth >= topStackCardInfo.worth) {
    return true;
  }
  // Check different cases for stack power card
  if (topStackCardInfo.power) {
    switch (topStackCardInfo.power) {
      case "reset":
        return true;
      case "skip":
        if (playedCardInfo.worth > 5) {
          return true;
        } else {
          return false;
        }
      case "lower":
        if (playedCardInfo.worth < 8 || playedCardInfo.worth === 15) {
          return true;
        } else {
          return false;
        }
      case "burn":
        return true;

      default:
        console.warn("Missing Case");
        return false;
    }
  }
  console.warn("Missing Case");
  return false;
}

export function playCards(cards, player, stack, deckRef) {}

export function checkBurnStack(stack, deckRef) {
  // Check for empty stack
  if (stack.length === 0) return false;

  const topStackCardInfo = deckRef[getTopStackCard(stack)];

  if (topStackCardInfo.power === "burn") {
    return true;
  }
  if (stack.length < 4) return false;

  const lastFourCards = stack.filter((card, i) => i >= stack.length - 4);

  if (allCardsHaveEqualValue(lastFourCards, deckRef)) {
    return true;
  }

  return false;
}
