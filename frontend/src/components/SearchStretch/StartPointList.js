import React from "react";
import RoutePointsList from "./RoutePoints/RoutePointsList.js";
import Map from "../UI/Map/Map";

function StartList({ stretches, getStartPoint, mountainArea = null }) {
	
	const scoredStretches = mountainArea != null ? stretches.filter(stretch => {
        return stretch.mountainArea.id === mountainArea.id
    }) : stretches;

	const startPoints = scoredStretches.map((stretch) => {
		return stretch.startPoint;
	});
	const uniqueStartPoints = startPoints.filter(
		(elem, idx) =>
			idx === startPoints.findIndex((point) => point.id === elem.id)
	);

	
	return (
		<>
			<RoutePointsList
				className="list__scrollabe"
				getCickedPointHandler={(point) => getStartPoint(point)}
				points={uniqueStartPoints}
			/>
			<Map />
		</>
	);
}

export default StartList;
