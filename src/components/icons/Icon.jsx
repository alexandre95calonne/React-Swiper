import React from "react";
import { Icon as IconifyIcon } from "@iconify/react";

const Icon = ({ icon, onClick, className, size = 24 }) => {
  return (
    <button
      className={`flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <IconifyIcon icon={icon} width={size} height={size} />
    </button>
  );
};

export default Icon;
