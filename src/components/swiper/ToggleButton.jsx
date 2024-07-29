import React from "react";
import { motion } from "framer-motion";

const ToggleButton = ({ onClick, children }) => (
  <motion.button
    className="bg-black text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:brightness-125"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

export default ToggleButton;
