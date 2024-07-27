// Card.jsx
import React, { useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import Icon from "./icons/Icon";
import { autoSwipe } from "../hooks/swipeUtils";
import CardImages from "./CardImages";
import CardTitle from "./CardTitlte";
import CardSubtitle from "./CardSubtitle";
import CardDescription from "./CardDescription";
import CardDetails from "./CardDetails";

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
  const rotate = useTransform(x, [-100, 100], [-15, 15]);
  const controls = useAnimation();
  const [keyboardSwipeDirection, setKeyboardSwipeDirection] = useState(null);
  const [isKeyboardSwipe, setIsKeyboardSwipe] = useState(false);

  const getBoxShadow = useCallback(() => {
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
      layoutId={`card-${item.id}`}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.45}
      dragMomentum={false}
      style={{
        x,
        y,
        rotate,
        boxShadow,
        zIndex: 1000 + index,
      }}
      onDragEnd={(event, info) => {
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
      }}
      className="absolute cursor-pointer rounded-lg shadow-lg overflow-hidden w-[90vw] sm:w-[500px] h-[60vh] md:h-[70vh]"
      onClick={() => {
        if (showInfo) {
          toggleInfo();
        } else {
          nextImage(index);
        }
      }}
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <CardImages
        images={item.images}
        currentIndex={currentImageIndex[index]}
        onImageChange={(imgIndex) => goToImage(index, imgIndex)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70">
        {!showInfo ? (
          <div className="absolute bottom-24 left-0 right-0 p-4 text-white">
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle title={item.name} />
                <CardSubtitle subtitle={`${item.age} years old`} />
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
            <CardDescription description={item.bio} />
          </div>
        ) : (
          <CardDetails
            title={item.name}
            subtitle={`${item.age} years old`}
            description={item.bio}
          />
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8 cursor-default">
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
    </motion.div>
  );
};

export default Card;