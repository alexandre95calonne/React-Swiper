export const autoSwipe =
  (controls, swipe, itemId, itemLink) => async (direction) => {
    const xMove = direction === "right" ? 700 : -700;
    const yMove = direction === "up" ? -600 : -80;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const swipeDuration = isMobile ? 0.7 : 0.4;

    await controls.start({
      x: xMove,
      y: yMove,
      rotate: direction === "right" ? 30 : -30,
      transition: { duration: swipeDuration },
    });

    swipe(direction, itemId);

    if (direction === "up" && itemLink) {
      setTimeout(() => {
        window.open(itemLink, "_blank");
      }, 1000);
    }
  };

export const getBoxShadow = (x, y, isKeyboardSwipe, keyboardSwipeDirection) => {
  if (isKeyboardSwipe) {
    switch (keyboardSwipeDirection) {
      case "left":
        return `0 0 20px rgba(255, 0, 0, 1)`;
      case "right":
        return `0 0 20px rgba(0, 255, 0, 1)`;
      case "up":
        return `0 0 20px rgba(0, 0, 255, 1)`;
      default:
        return "none";
    }
  }

  const xValue = x.get();
  const yValue = y.get();

  const upSwipeThreshold = -75;
  const horizontalThreshold = 100;

  if (yValue < upSwipeThreshold) {
    const intensity = Math.min(Math.abs(yValue) / 150, 1);
    return `0 0 20px rgba(0, 0, 255, ${intensity})`;
  } else if (xValue < -horizontalThreshold) {
    const intensity = Math.min(Math.abs(xValue) / 200, 1);
    return `0 0 20px rgba(255, 0, 0, ${intensity})`;
  } else if (xValue > horizontalThreshold) {
    const intensity = Math.min(xValue / 200, 1);
    return `0 0 20px rgba(0, 255, 0, ${intensity})`;
  } else {
    return "none";
  }
};

export const handleDragEnd = (event, info, item, swipe) => {
  const offsetX = info.offset.x;
  const offsetY = info.offset.y;
  if (offsetY < -75) {
    window.open(item.link, "_blank");
    swipe("up", item.id);
  } else if (offsetX < -100) {
    swipe("left", item.id);
  } else if (offsetX > 100) {
    swipe("right", item.id);
  }
};

export const iconHoverEffect = {
  scale: 1.05,
  transition: { duration: 0.2 },
};
