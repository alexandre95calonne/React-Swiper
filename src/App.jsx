import React from "react";
import Swiper from "./components/Swiper/Swiper";
import data from "./data/data";

function App() {
  const processedItems = data.map((item) => ({
    ...item,
    link: item.link || "default-link",
    description: item.bio,
  }));

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md h-3/4">
        <Swiper items={processedItems} disableSuperLike />
      </div>
    </div>
  );
}

export default App;
