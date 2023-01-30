import React from "react";
import { useState } from "react";
import classes from "./RulesModal.module.css";
import RulesSection from "./UI/RulesSection";
import start2 from "../../assets/start2.png";
import start1 from "../../assets/start1.png";
import start3 from "../../assets/start3.png";
import second1 from "../../assets/second1.png";
import second2 from "../../assets/second2.png";
import Card from "../../components/UI/Card";
import Stack from "../Game/Stack/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import store from "../../redux/store";
import userActions from "../../redux/userSlice";

const RulesModal = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const [currentPage, setCurrentPage] = useState(null);
  const togglePage = (page) => {
    if (page === currentPage) return setCurrentPage(null);
    return setCurrentPage(page);
  };
  const closeModal = () => {
    store.dispatch(userActions.setModal(null));
  };
  const closed = currentPage === null;
  return (
    <div className={classesList}>
      <FontAwesomeIcon
        icon={faClose}
        onClick={closeModal}
        className={classes.close}
      />
      <h2 className={classes.title}>How to play</h2>
      <h4 className={classes.intro + " " + (closed && classes.show)}>
        <span className={classes.gold}>Ship-head</span> is a card game, the
        object of which is to lose all of one's playing cards, with the final
        player being crowned the "ship-head".
      </h4>
      <div className={classes.sectionsContainer}>
        <RulesSection
          title="Setup"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={1}
        >
          <div className={classes.sectionContent}>
            <p className={classes.paragraph}>
              From a standard, shuffled deck of cards, each player is dealt 9
              cards in total:
              <span className={classes.gold}>
                {" "}
                3 face-down cards in a row (blind cards) and 6 hand cards.
              </span>
            </p>
            <div className={classes.imagesContainer}>
              <div className={classes.imageContainer}>
                <img src={start2} alt="" className={classes.image} />
              </div>
              <div className={classes.imageContainer}>
                <img src={start1} alt="" className={classes.image} />
              </div>
            </div>
            <p className={classes.paragraph}>
              The blind cards will be the last cards to be played and players
              are not allowed to see or change these cards until the ending
              turns of the game.
            </p>

            <p className={classes.paragraph}>
              At the beginning of the game,{" "}
              <span className={classes.gold}>
                {" "}
                players must place 3 cards from their hand cards on top of their
                blind cards to produce a strong set of face-up cards
              </span>{" "}
              for later in the game.
            </p>
          </div>
        </RulesSection>
        <RulesSection
          title="Gameplay"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={2}
        >
          <div className={classes.sectionContent}>
            <p className={classes.paragraph}>
              The starting player is determined by whoever has the lowest value
              of cards in hand, and may play a card.
            </p>
            <p className={classes.paragraph}>
              The second player must then place an
              <span className={classes.gold}>
                {" "}
                equal or higher card (in numerical value) than the card played
                previously,
              </span>{" "}
              this card is to be put on top of the starting card to form the
              discard pile. All subsequent players follow this rule.
            </p>
            <div className={classes.imagesContainer}>
              <div className={classes.imageContainer}>
                <img src={second2} alt="" className={classes.image} />
              </div>
              <div className={classes.imageContainer}>
                <img src={second1} alt="" className={classes.image} />
              </div>
            </div>
            <p className={classes.paragraph}>
              Each player should have at least 3 cards in their hand at all
              times and a
              <span className={classes.gold}>
                {" "}
                after placing a card down draws another card from the deck -
                until the deck runs out of cards.
              </span>{" "}
              The game continues sequentially in a clockwise direction.
            </p>
          </div>
        </RulesSection>
        <RulesSection
          title="Card values"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={3}
        >
          <div className={classes.sectionContent}>
            <p className={classes.paragraph}>
              Aces are the highest card in the deck, trumped only by a{" "}
              <span className={classes.gold}>power card.</span> power cards can
              be played on any card.
            </p>
            <p className={classes.paragraph}>
              When a ten is played, the discard pile is immediately{" "}
              <span className={classes.gold}>
                "burned" (removed from play and set aside for the remainder of
                the game).
              </span>{" "}
              The same player then takes another turn, playing any card or set
              to begin a new discard pile.
            </p>
          </div>
        </RulesSection>
        <RulesSection
          title="Power cards"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={4}
        >
          <div className={classes.sectionContent}>
            <div className={classes.cardContainer}>
              <Card name="2Spades" className={classes.card} type="null" />

              <p className={classes.paragraph}>
                Any card can be played to follow a two. This card can be
                considered a 'reset' of the stack.
              </p>
            </div>
            <div className={classes.cardContainer}>
              <Card name="5Hearts" className={classes.card} type="face" />

              <p className={classes.paragraph}>
                a five skips over the following player. If multiple fives are
                played the turn skips over the same amount of players. if only 2
                players remain any amount of fives will skip to the original
                player.
              </p>
            </div>
            <div className={classes.cardContainer}>
              <Card name="8Diamonds" className={classes.card} type="face" />

              <p className={classes.paragraph}>
                For the next turn only, a player must play a card of equal or
                lower value than an eight.
              </p>
            </div>
            <div className={classes.cardContainer}>
              <Card name="10Clubs" className={classes.card} type="face" />

              <p className={classes.paragraph}>
                When a ten is played, the discard pile is immediately "burned"
                (removed from play and set aside for the remainder of the game).
                The same player then takes another turn, playing any card or set
                to begin a new discard pile.
              </p>
            </div>
          </div>
        </RulesSection>
        <RulesSection
          title="ADDITIONAL RULES"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={5}
        >
          <div className={classes.sectionContent}>
            <h3 className={classes.subtitle}>Four of a kind</h3>
            <p className={classes.paragraph}>
              If a player is able to place four cards with the same numerical
              value (e.g.<span className={classes.gold}> 6♦ 6♣ 6♥ 6♠ </span>or
              <span className={classes.gold}> Q♥ Q♦ Q♠ Q♣</span>), this burns
              the discards in the same manner as a ten.
            </p>
            <p>
              Burning can also happen across multiple players' turns: for
              example, if a player first plays
              <span className={classes.gold}> 4♥ 4♦ 4♠</span> and the next
              player in turn has the<span className={classes.gold}> 4♣</span>,
              they can drop that card to finish the set and burn the discard
              pile. The player who burns the discard pile must then play another
              card.
            </p>
            <h3 className={classes.subtitle}>Jacks</h3>
            <p>
              Playing any jack (
              <span className={classes.gold}>J♥, J♦, J♠, J♣</span>) will reverse
              the direction of play. if 2 jacks are played the direction is
              reversed twice (no change). in a two player game jacks do nothing.{" "}
              <span className={classes.gold}>jacks are not power cards</span>{" "}
              and may only be played on cards or equal or lower value.
            </p>
          </div>
        </RulesSection>
        <RulesSection
          title="picking up"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={6}
        >
          <div className={classes.sectionContent}>
            {/* <h3 className={classes.subtitle}>Four of a kind</h3> */}
            <p>
              When a player has no power cards and no single card that is equal
              or higher in value than the card on top of the play pile,{" "}
              <span className={classes.gold}>
                they must pick up all the cards on the play pile and end their
                turn.
              </span>{" "}
            </p>
            <p>
              Picking up the pile can often put a player at a great disadvantage
              when many cards have been played, as they will have more cards to
              shed than other players. Even so, it is still possible to quickly
              recover from this handicap by burning the pile.
            </p>
          </div>
        </RulesSection>
        <RulesSection
          title="face-up / blind cards"
          currentPage={currentPage}
          togglePage={togglePage}
          sectionNumber={7}
        >
          <div className={classes.sectionContent}>
            <p>
              After a player has no more cards in their hand, and the deck is
              empty, they need to
              <span className={classes.gold}>
                {" "}
                play from their three face-up cards.
              </span>{" "}
              They cannot play from this set of cards until they have finished
              with their hand.
            </p>
            <p>
              {" "}
              Following the rule: the value of the face-up card must be higher
              than the value of the card on the top of the pile,{" "}
              <span className={classes.gold}>
                if a player cannot play the face-up card, then they must pick up
                the pile.
              </span>{" "}
            </p>
            <p>
              Once all of the face-up cards have been played, a player must then
              play their blind cards.{" "}
              <span className={classes.gold}>
                These cards are played one at a time, without the player knowing
                the card until the moment it is played.
              </span>{" "}
              As usual, if the chosen card is lower than the previous card
              played, they need to pick up the pile, and are required to play
              their entire hand again before progressing to the rest of their
              face-down cards.
            </p>
            <p>
              <span className={classes.gold}>
                When a player has no cards left, they are out.
              </span>{" "}
              The game progresses until only one player is left, at which point
              they are crowned the{" "}
              <span className={classes.gold}>"ship-head"</span>.
            </p>
          </div>
        </RulesSection>
      </div>
    </div>
  );
};

export default RulesModal;
