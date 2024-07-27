import React from "react";
import Swiper from "./components/Swiper";
import data from "./data/data";

function App() {
  const processedItems = data.map((item) => ({
    ...item,
    link: item.link || "default-link",
    description: item.bio,
  }));

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-[90dvh] h-[90dvh] flex flex-col">
        <Swiper items={processedItems} />
      </div>
    </div>
  );
}

export default App;
