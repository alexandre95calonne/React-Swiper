import React from "react";
import { Icon } from "@iconify/react";

const IconButton = ({ icon, onClick }) => {
  return (
    <button
      className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
      onClick={onClick}
    >
      <Icon icon={icon} width="24" height="24" />
    </button>
  );
};

export default IconButton;
