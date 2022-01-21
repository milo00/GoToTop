import React from "react";

import MountainArea from "./MountainArea.js";
import './MountainAreaList.css';

const MountainAreaList = ({areas, getCickedAreaHandler}) => {
 

  return (
    <ul className="list__container">
      {areas.map((area) => (
        <MountainArea
          key={area.id}
          area={area}
          onAreaClickHandler={() =>getCickedAreaHandler(area)}
        />
      ))}
    </ul>
  );
};

export default MountainAreaList;