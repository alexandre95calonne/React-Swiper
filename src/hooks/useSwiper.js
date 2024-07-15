import { useState } from "react";
import { useMotionValue, useTransform } from "framer-motion";

const useSwiper = () => {
  const [direction, setDirection] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const swipe = (direction) => {
    setDirection(direction);
    // Implement swipe animation logic here
  };

  return { swipe, direction, x, y, rotate, opacity };
};

export default useSwiper;
