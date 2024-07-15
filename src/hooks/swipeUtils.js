// swipeUtils.js

export const swipe =
  (setCards, setCurrentImageIndex, setShowInfo, setCurrentCardIndex) =>
  (direction, id) => {
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
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      return prev.filter((card) => card.id !== id);
    });
  };

export const autoSwipe =
  (controls, swipe, itemId, itemLink) => async (direction) => {
    const xMove = direction === "right" ? 700 : -700;
    const yMove = direction === "up" ? -600 : -100;
    await controls.start({
      x: xMove,
      y: yMove,
      rotate: direction === "right" ? 30 : -30,
      transition: { duration: 0.4 },
    });
    swipe(direction, itemId);
    if (direction === "up" && itemLink) {
      setTimeout(() => {
        window.open(itemLink, "_blank");
      }, 1000);
    }
  };
