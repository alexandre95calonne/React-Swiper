import React from "react";

const CardDetails = ({ title, subtitle, description }) => (
  <div
    className="absolute bottom-0 left-0 right-0 overflow-scroll rounded-t-lg bg-white/95 p-4 pb-11 text-black shadow-lg cursor-default"
    style={{ height: "60%" }}
  >
    <p>{title}</p>
    <p>{subtitle}</p>
    <p>{description}</p>
  </div>
);

export default CardDetails;
