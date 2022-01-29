import React from "react";
import Map from "../UI/Map/Map.js";

import MountainArea from "./MountainArea.js";
import './MountainAreaList.css';

const MountainAreaList = ({stretches, getCickedAreaHandler}) => {

    const areas = stretches.map((stretch) => {
        return stretch.mountainArea;
    });
    const uniqueAreas = areas.filter((elem, idx) => idx === areas.findIndex((a) => a.id === elem.id));


    return (
        <>
            <ul className="list__container">
                {
                uniqueAreas.map((area) => (
                    <MountainArea 
                        key={area.id}
                        area={area}
                        onAreaClickHandler={(area) => getCickedAreaHandler(area)}
                    />
                ))
            } </ul>
            <Map/>
        </>
    );
};

export default MountainAreaList;
