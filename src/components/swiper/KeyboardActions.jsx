import React from "react";
import Icon from "../icons/Icon";

const KeyboardActions = () => (
  <div className="hidden md:flex flex-wrap justify-between items-center gap-8 text-sm">
    <div className="flex items-center gap-2">
      <Icon icon="gg:arrow-left-r" />
      <p className="text-base">Non</p>
    </div>
    <div className="flex items-center gap-2">
      <Icon icon="gg:arrow-right-r" />
      <p className="text-base">Like</p>
    </div>
    <div className="flex items-center gap-2">
      <Icon icon="gg:arrow-up-r" />
      <p className="text-base">Voir les détails</p>
    </div>
    <div className="flex items-center gap-2">
      <Icon icon="icon-park-outline:enter-key" />
      <p className="text-base">Acheter</p>
    </div>
    <div className="flex items-center gap-2">
      <Icon icon="mdi:keyboard-space" />
      <p className="text-base">Photo suivante</p>
    </div>
  </div>
);

export default KeyboardActions;
