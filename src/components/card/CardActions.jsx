import React from "react";
import { motion } from "framer-motion";
import Icon from "../icons/Icon";
import { iconHoverEffect } from "../../hooks/CardUtils";

const CardActions = ({ autoSwipeHandler, disableSuperLike }) => {
  return (
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
  );
};

export default CardActions;
