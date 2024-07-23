// Swiper.jsx
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./Card";
import { swipe } from "../../hooks/swipeUtils";
import Icon from "../icons/Icon";
import { motion } from "framer-motion";

const Swiper = ({
  items,
  disableSuperLike = false,
  disablePopOver = false,
  disableKeyboards = false,
  hideKeyboardsActions = false,
}) => {
  const [cards, setCards] = useState(items);
  const [showInfo, setShowInfo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    new Array(items.length).fill(0)
  );
  const [showSection, setShowSection] = useState(true);

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

  const toggleSectionVisibility = () => setShowSection(!showSection);

  const currentCard = cards[cards.length - 1];

  const currentCardControlsRef = React.useRef(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (disableKeyboards) return;
      if (!currentCard || !currentCardControlsRef.current) return;

      switch (event.key) {
        case "ArrowLeft":
          currentCardControlsRef.current.autoSwipeHandler("left");
          break;
        case "ArrowRight":
          currentCardControlsRef.current.autoSwipeHandler("right");
          break;
        case "Enter":
          if (!disableSuperLike) {
            currentCardControlsRef.current.autoSwipeHandler("up");
          }
          break;
        case "ArrowUp":
          if (!showInfo) {
            currentCardControlsRef.current.toggleInfo();
          }
          break;
        case "ArrowDown":
          if (showInfo) {
            currentCardControlsRef.current.toggleInfo();
          }
          break;
        case " ":
          nextImage(cards.length - 1);
          break;
        default:
          break;
      }
    },
    [
      currentCard,
      showInfo,
      disableSuperLike,
      disableKeyboards,
      cards,
      nextImage,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow flex items-center justify-center">
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
                disableKeyboards={disableKeyboards}
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
      {!hideKeyboardsActions && (
        <div className="mt-4 w-full">
          {showSection && (
            <div className="hidden md:flex flex-wrap justify-between items-center gap-2 text-sm">
              <div className="flex justify-center">
                <motion.button
                  className="bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:brightness-125"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSectionVisibility}
                >
                  Masquer
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <Icon icon="gg:arrow-left-r" />
                <p className="text-base">Non</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="gg:arrow-right-r" />
                <p className="text-base">Like</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="gg:arrow-up-r" />
                <p className="text-base">Voir les détails</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="icon-park-outline:enter-key" />
                <p className="text-base">Acheter</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:keyboard-space" />
                <p className="text-base">Photo suivante</p>
              </div>
            </div>
          )}
          {!showSection && (
            <div className="flex justify-center">
              <motion.button
                className="bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:brightness-125"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSectionVisibility}
              >
                Afficher
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Swiper;
