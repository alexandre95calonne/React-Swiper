import React from "react";
import Swiper from "./components/swiper/Swiper";
import data from "./data/data";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-[90dvh] h-[90dvh] flex flex-col">
        <Swiper items={data} />
      </div>
    </div>
  );
}

export default App;
