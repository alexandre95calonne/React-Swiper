// Swiper.jsx
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "../card/Card";
import {
  swipe,
  nextImage,
  goToImage,
  toggleInfo,
  toggleSectionVisibility,
  createHandleKeyDown,
} from "../../hooks/swiperUtils";
import ToggleButton from "./ToggleButton";
import KeyboardActions from "./KeyboardActions";

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

  const nextImageHandler = useCallback(nextImage(setCurrentImageIndex, cards), [
    cards,
  ]);
  const goToImageHandler = useCallback(goToImage(setCurrentImageIndex), []);
  const toggleInfoHandler = useCallback(toggleInfo(setShowInfo), []);
  const toggleSectionVisibilityHandler = useCallback(
    toggleSectionVisibility(setShowSection),
    []
  );

  const currentCard = cards[cards.length - 1];
  const currentCardControlsRef = React.useRef(null);

  const handleKeyDown = useCallback(
    createHandleKeyDown(
      currentCard,
      currentCardControlsRef,
      disableKeyboards,
      disableSuperLike,
      showInfo,
      cards,
      nextImageHandler
    ),
    [
      currentCard,
      showInfo,
      disableSuperLike,
      disableKeyboards,
      cards,
      nextImageHandler,
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
                nextImage={() => nextImageHandler(index)}
                goToImage={(imageIndex) => goToImageHandler(index, imageIndex)}
                showInfo={showInfo}
                toggleInfo={toggleInfoHandler}
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
          {showSection ? (
            <>
              <div className="flex justify-center gap-8">
                <ToggleButton onClick={toggleSectionVisibilityHandler}>
                  Masquer
                </ToggleButton>

                <KeyboardActions />
              </div>
            </>
          ) : (
            <div className="hidden md:flex  justify-center">
              <ToggleButton onClick={toggleSectionVisibilityHandler}>
                Afficher
              </ToggleButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Swiper;
