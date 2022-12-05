import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Deck = () => {
  const [cards, setCards] = useState(null);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const getDeck = async () => {
      const res = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeck((n) => (n = res.data));
    };
    getDeck();
  }, []);

  const getACard = async () => {
    if (deck.remaining > 0) {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      setDeck((n) => (n = { ...deck, remaining: res.data.remaining }));
      cards
        ? setCards([...cards, res.data.cards[0]])
        : setCards(res.data.cards);
    } else {
      alert("Error: no cards remaining!");
    }
  };

  const reshuffleDeck = async () => {
    let id = deck.deck_id;
    setDeck((n) => (n = null));
    setCards((n) => (n = null));
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${id}/shuffle/`
    );
    setDeck((n) => (n = res.data));
  };

  return (
    <>
      {deck ? (
        <>
          <button type="button" onClick={getACard}>
            Gimme a card!
          </button>
          <button type="button" onClick={reshuffleDeck}>
            Shuffle
          </button>
        </>
      ) : (
        <p>Getting Deck...</p>
      )}
      {cards ? (
        cards.map((card) => (
          <Card image={card.image} value={card.value} suit={card.suit} />
        ))
      ) : (
        <p>Add a card</p>
      )}
    </>
  );
};
export default Deck;
