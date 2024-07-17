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
            currentCardControlsRef.current.controls,
            swipeHandler,
            currentCard.id,
            currentCard.link
          )("left");
          break;
        case "ArrowUp":
          // Toggle info open
          if (!showInfo) {
            currentCardControlsRef.current.toggleInfo();
          }
          break;
        case "ArrowDown":
          // Close info if it's open
          if (showInfo) {
            currentCardControlsRef.current.toggleInfo();
          }
          break;
        case "ArrowRight":
          autoSwipe(
            currentCardControlsRef.current.controls,
            swipeHandler,
            currentCard.id,
            currentCard.link
          )("right");
          break;
        case "Enter":
          // Perform super-like (swipe to top)
          if (!disableSuperLike) {
            autoSwipe(
              currentCardControlsRef.current.controls,
              swipeHandler,
              currentCard.id,
              currentCard.link
            )("up");
          }
          break;
        default:
          break;
      }
    },
    [currentCard, swipeHandler, showInfo, disableSuperLike]
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
      <div className="mt-4 w-full">
        {showSection && (
          <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
            <button
              className="reverse-button h-8 px-2"
              onClick={toggleSectionVisibility}
            >
              Masquer
            </button>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path d="m11.948 14.829l-1.414 1.414L6.29 12l4.243-4.243l1.414 1.415L10.12 11h7.537v2H10.12z"></path>
                  <path
                    fillRule="evenodd"
                    d="M23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4zm-4 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
              <p className="text-base">Non</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path d="m12.052 14.829l1.414 1.414L17.71 12l-4.243-4.243l-1.414 1.415L13.88 11H6.343v2h7.537z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1 19a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4zm4 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
              <p className="text-base">Like</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <rect width={18} height={18} x={3} y={3} rx={2}></rect>
                  <path d="M12 8v8m-4-4l4 4l4-4"></path>
                </g>
              </svg>
              <p className="text-base">Voir les détails</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                >
                  <path d="M44 44V4H24v16H4v24z"></path>
                  <path d="m21 28l-4 4l4 4"></path>
                  <path d="M34 23v9H17"></path>
                </g>
              </svg>
              <p className="text-base">Acheter</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M4 15V9h2v4h12V9h2v6z"></path>
              </svg>
              <p className="text-base">Photo suivante</p>
            </div>
          </div>
        )}
        {!showSection && (
          <div className="flex justify-center">
            <button
              className="reverse-button h-8 px-2"
              onClick={toggleSectionVisibility}
            >
              Afficher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swiper;
