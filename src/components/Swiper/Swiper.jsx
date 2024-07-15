// Swiper.jsx
import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import { swipe } from "../../hooks/swipeUtils";

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const swipeHandler = useCallback(
    swipe(setCards, setCurrentImageIndex, setShowInfo, setCurrentCardIndex),
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
              isCurrent={index === currentCardIndex}
              disableSuperLike={disableSuperLike}
              disablePopOver={disablePopOver}
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
