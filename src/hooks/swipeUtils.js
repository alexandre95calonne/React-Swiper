// swipeUtils.js

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

// The swipeUtils.js file contains two different methods, swipe and autoSwipe, because they serve different purposes in the application:

// swipe function:

// This is the core swiping logic that updates the state of the application.
// It's called when a card is swiped (either manually or automatically).
// It updates the card list, resets image indices, hides info, and updates the current card index.
// This function is primarily used to manage the internal state of the Swiper component.

// autoSwipe function:

// This function is used for programmatically triggering a swipe action, such as when a user clicks a button instead of manually swiping.
// It handles the animation of the card moving off-screen.
// After the animation, it calls the swipe function to update the application state.
// It also handles opening a link in a new tab if the swipe direction is "up" and a link is provided.

// The main differences are:

// swipe is about state management, while autoSwipe is about animation and user interaction.
// swipe is called directly for manual swipes, while autoSwipe is used for button clicks or other programmatic swipes.
// autoSwipe includes animation logic using Framer Motion's controls, which swipe doesn't handle.

// Having these as separate functions allows for more flexibility in how swiping is handled in different scenarios (manual drag vs. button click) while keeping the core state update logic consistent.
