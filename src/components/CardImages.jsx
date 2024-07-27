import React from "react";

const CardImages = ({ images, currentIndex, onImageChange }) => (
  <div className="relative h-full w-full">
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    ></div>
    <div className="absolute left-1/2 top-2 flex -translate-x-1/2 transform space-x-2">
      {images.map((_, imgIndex) => (
        <div
          key={imgIndex}
          className={`h-2 w-9 rounded-full ${
            imgIndex === currentIndex ? "bg-white" : "bg-gray-500"
          } cursor-pointer`}
          onClick={() => onImageChange(imgIndex)}
        ></div>
      ))}
    </div>
  </div>
);

export default CardImages;
