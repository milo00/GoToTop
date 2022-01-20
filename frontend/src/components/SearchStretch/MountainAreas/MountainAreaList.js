import React from "react";

import MountainArea from "./MountainArea.js";

const MountainAreaList = ({areas, getCickedAreaHandler}) => {
 

  return (
    <ul>
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