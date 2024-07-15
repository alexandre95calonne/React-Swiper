import React, { useEffect } from "react";
import IconButton from "../icons/Icon";

const Controls = ({ onSwipe, disableSuperLike }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          onSwipe("left");
          break;
        case "ArrowRight":
          onSwipe("right");
          break;
        case "ArrowUp":
          if (!disableSuperLike) onSwipe("up");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onSwipe, disableSuperLike]);

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
      <IconButton icon="mdi:close" onClick={() => onSwipe("left")} />
      {!disableSuperLike && (
        <IconButton icon="mdi:star" onClick={() => onSwipe("up")} />
      )}
      <IconButton icon="mdi:heart" onClick={() => onSwipe("right")} />
    </div>
  );
};

export default Controls;
