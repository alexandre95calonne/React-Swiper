// swiperUtils.js

export const swipe =
  (setCards, setCurrentImageIndex, setShowInfo) => (direction, id) => {
    setCards((prev) => {
      const cardIndex = prev.findIndex((card) => card.id === id);
      setCurrentImageIndex((current) => {
        const newIndices = [...current];
        if (cardIndex !== -1) {
          newIndices[cardIndex] = 0;
        }
        return newIndices;
      });
      setShowInfo(false);
      return prev.filter((card) => card.id !== id);
    });
  };

export const nextImage = (setCurrentImageIndex, cards) => (index) => {
  setCurrentImageIndex((current) =>
    current.map((val, idx) =>
      idx === index ? (val + 1) % cards[index].images.length : val
    )
  );
};

export const goToImage = (setCurrentImageIndex) => (cardIndex, imageIndex) => {
  setCurrentImageIndex((current) =>
    current.map((val, idx) => (idx === cardIndex ? imageIndex : val))
  );
};

export const toggleInfo = (setShowInfo) => () => setShowInfo((prev) => !prev);

export const toggleSectionVisibility = (setShowSection) => () =>
  setShowSection((prev) => !prev);

export const createHandleKeyDown =
  (
    currentCard,
    currentCardControlsRef,
    disableKeyboards,
    disableSuperLike,
    showInfo,
    cards,
    nextImage
  ) =>
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
  };
