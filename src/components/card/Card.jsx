// Card.jsx
import React, { useCallback, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import Icon from "../icons/Icon";
import {
  autoSwipe,
  getBoxShadow,
  handleDragEnd,
  iconHoverEffect,
} from "../../hooks/CardUtils";
import CardImages from "./CardImages";
import CardTitle from "./CardTitlte";
import CardSubtitle from "./CardSubtitle";
import CardDescription from "./CardDescription";
import CardDetails from "./CardDetails";
import CardActions from "./CardActions";

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

  const boxShadow = useTransform([x, y], () =>
    getBoxShadow(x, y, isKeyboardSwipe, keyboardSwipeDirection)
  );

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

  useEffect(() => {
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
      onDragEnd={(event, info) => handleDragEnd(event, info, item, swipe)}
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
            <CardDescription description={item.description} />
          </div>
        ) : (
          <CardDetails
            title={item.name}
            subtitle={`${item.age} years old`}
            description={item.description}
          />
        )}
        <CardActions
          autoSwipeHandler={autoSwipeHandler}
          disableSuperLike={disableSuperLike}
        />
      </div>
    </motion.div>
  );
};

export default Card;
