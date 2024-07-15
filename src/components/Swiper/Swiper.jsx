// Swiper.jsx
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import { swipe, autoSwipe } from "../../hooks/swipeUtils";

const Swiper = ({
  items,
  disableSuperLike = false,
  disablePopOver = false,
}) => {
  const [cards, setCards] = useState(items);
  const [showInfo, setShowInfo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    new Array(items.length).fill(0)
  );

  const swipeHandler = useCallback(
    swipe(setCards, setCurrentImageIndex, setShowInfo),
    []
  );

  const nextImage = (index) => {
    setCurrentImageIndex((current) =>
      current.map((val, idx) =>
        idx === index ? (val + 1) % cards[index].images.length : val
      )
    );
  };

  const goToImage = (cardIndex, imageIndex) => {
    setCurrentImageIndex((current) =>
      current.map((val, idx) => (idx === cardIndex ? imageIndex : val))
    );
  };

  const toggleInfo = () => setShowInfo(!showInfo);

  // Get the current (topmost) card
  const currentCard = cards[cards.length - 1];

  // Create a ref for the current card's controls
  const currentCardControlsRef = React.useRef(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (!currentCard || !currentCardControlsRef.current) return;

      switch (event.key) {
        case "ArrowLeft":
          autoSwipe(
            currentCardControlsRef.current,
            swipeHandler,
            currentCard.id,
            currentCard.link
          )("left");
          break;
        case "ArrowUp":
          if (!disableSuperLike) {
            autoSwipe(
              currentCardControlsRef.current,
              swipeHandler,
              currentCard.id,
              currentCard.link
            )("up");
          }
          break;
        case "ArrowRight":
          autoSwipe(
            currentCardControlsRef.current,
            swipeHandler,
            currentCard.id,
            currentCard.link
          )("right");
          break;
        default:
          break;
      }
    },
    [currentCard, swipeHandler, disableSuperLike]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <AnimatePresence>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={card.id}
              item={card}
              index={index}
              swipe={swipeHandler}
              currentImageIndex={currentImageIndex}
              nextImage={nextImage}
              goToImage={goToImage}
              showInfo={showInfo}
              toggleInfo={toggleInfo}
              isCurrent={index === cards.length - 1}
              disableSuperLike={disableSuperLike}
              disablePopOver={disablePopOver}
              controlsRef={
                index === cards.length - 1 ? currentCardControlsRef : null
              }
            />
          ))
        ) : (
          <div className="text-center text-2xl font-bold text-gray-600">
            No more cards to swipe :/
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Swiper;
