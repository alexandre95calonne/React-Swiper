import React, { useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import Icon from "../icons/Icon";
import { autoSwipe } from "../../hooks/swipeUtils";

const Card = ({
  item,
  index,
  swipe,
  currentImageIndex,
  nextImage,
  goToImage,
  showInfo,
  toggleInfo,
  isCurrent,
  disableSuperLike,
  disablePopOver,
  disableKeyboards,
  controlsRef,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const controls = useAnimation();
  const [keyboardSwipeDirection, setKeyboardSwipeDirection] = useState(null);
  const [isKeyboardSwipe, setIsKeyboardSwipe] = useState(false);

  const getBoxShadow = useCallback(() => {
    if (isKeyboardSwipe) {
      switch (keyboardSwipeDirection) {
        case "left":
          return `0 0 20px rgba(255, 0, 0, 1)`; // Red for left swipe
        case "right":
          return `0 0 20px rgba(0, 255, 0, 1)`; // Green for right swipe
        case "up":
          return `0 0 20px rgba(0, 0, 255, 1)`; // Blue for up swipe (super-like)
        default:
          return "none";
      }
    }

    const xValue = x.get();
    const yValue = y.get();

    const upSwipeThreshold = -35;
    const horizontalThreshold = 20;

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
  }, [x, y, isKeyboardSwipe, keyboardSwipeDirection]);

  const boxShadow = useTransform([x, y], () => getBoxShadow());

  const iconHoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const autoSwipeHandler = useCallback(
    (direction) => {
      setIsKeyboardSwipe(true);
      setKeyboardSwipeDirection(direction);
      autoSwipe(
        controls,
        swipe,
        item.id,
        item.link
      )(direction).finally(() => {
        setIsKeyboardSwipe(false);
        setKeyboardSwipeDirection(null);
      });
    },
    [controls, swipe, item.id, item.link]
  );

  React.useEffect(() => {
    if (controlsRef) {
      controlsRef.current = {
        controls,
        toggleInfo,
        autoSwipeHandler,
      };
    }
  }, [controlsRef, controls, toggleInfo, autoSwipeHandler]);

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.5}
      style={{
        x,
        y,
        rotate,
        boxShadow,
        height: "70vh",
        width: "500px",
        zIndex: 1000 + index,
      }}
      onDragEnd={(event, info) => {
        const offsetX = info.offset.x;
        const offsetY = info.offset.y;
        if (offsetX < -200) {
          swipe("left", item.id);
        } else if (offsetX > 200) {
          swipe("right", item.id);
        } else if (offsetY < -150) {
          window.open(item.link, "_blank");
          swipe("up", item.id);
        }
      }}
      className="absolute cursor-pointer rounded-lg shadow-lg overflow-hidden"
      onClick={() => {
        if (showInfo) {
          toggleInfo();
        } else {
          nextImage(index);
        }
      }}
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${item.images[currentImageIndex[index]]})`,
          }}
          onClick={(e) => e.stopPropagation()}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
          <div className="absolute left-1/2 top-2 flex -translate-x-1/2 transform space-x-2">
            {item.images && item.images.length > 1 && (
              <div className="absolute left-1/2 top-2 flex -translate-x-1/2 transform space-x-2">
                {item.images.map((_, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`h-2 w-9 rounded-full ${
                      imgIndex === currentImageIndex[index]
                        ? "bg-white"
                        : "bg-gray-500"
                    } ${showInfo ? "cursor-default" : "cursor-pointer"}`}
                    onClick={(e) => {
                      if (!showInfo) {
                        e.stopPropagation();
                        goToImage(index, imgIndex);
                      }
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {!showInfo ? (
            <div className="absolute bottom-24 left-0 right-0 p-4 text-white">
              <div className="">
                <div className="flex flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-lg">{item.age} years old</p>
                  </div>

                  {!disablePopOver && (
                    <motion.div whileHover={iconHoverEffect}>
                      <Icon
                        icon="mdi:information-outline"
                        className="text-white"
                        size={35}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleInfo();
                        }}
                      />
                    </motion.div>
                  )}
                </div>
                <p className="text-base truncate">{item.bio}</p>
              </div>
            </div>
          ) : (
            <div
              className="absolute bottom-0 left-0 right-0 overflow-scroll rounded-t-lg bg-white/95 p-4 pb-11 text-black shadow-lg cursor-default"
              style={{ height: "60%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-lg">{item.age} years old</p>
              <p className="text-base truncate">{item.bio}</p>
            </div>
          )}

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
            <motion.div whileHover={iconHoverEffect}>
              <Icon
                icon="mdi:close"
                className="text-red-500 border-2 border-red-500 rounded-full p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  autoSwipeHandler("left");
                }}
                size={35}
              />
            </motion.div>

            {!disableSuperLike && (
              <motion.div whileHover={iconHoverEffect}>
                <Icon
                  icon="mdi:star"
                  className="text-blue-500 border-2 border-blue-500 rounded-full p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    autoSwipeHandler("up");
                  }}
                  size={35}
                />
              </motion.div>
            )}

            <motion.div whileHover={iconHoverEffect}>
              <Icon
                icon="mdi:heart"
                className="text-green-500 border-2 border-green-500 rounded-full p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  autoSwipeHandler("right");
                }}
                size={35}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
