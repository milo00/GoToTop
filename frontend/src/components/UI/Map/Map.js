import React from "react";
import GoogleMapReact from "google-map-react";
import mapStyle from "./mapStyle";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const DEFAULT_ZOOM = 10;
const DEFAULT_LABEL = "";
const DEFAULT_START_POS = { lng: 20.09037, lat: 49.26123 };
const DEFAULT_END_POS = { lng: 20.0877, lat: 49.28219 };
const DEFAULT_STATE = false;

const Map = ({
	startName = DEFAULT_LABEL,
	startLng = DEFAULT_START_POS.lng,
	startLat = DEFAULT_START_POS.lat,
	endLng = DEFAULT_END_POS.lng,
	endLat = DEFAULT_END_POS.lat,
	zoom = DEFAULT_ZOOM,
	showMarker = DEFAULT_STATE,
	showRoute = DEFAULT_STATE,
}) => {
	const startPoint = { lng: startLng, lat: startLat };
	const endPoint = { lng: endLng, lat: endLat };

	const apiIsLoaded = (map, maps) => {
		if (showMarker) {
			let marker = new maps.Marker({
				position: {
					lng: startPoint.lng,
					lat: startPoint.lat,
				},

				label: startName,

				map,
			});
			return marker;
		}
		if (showRoute) {
			const directionsService = new maps.DirectionsService();
			const directionsRenderer = new maps.DirectionsRenderer();
			directionsRenderer.setMap(map);

			directionsService.route(
				{
					origin: {
						lat: startPoint.lat,
						lng: startPoint.lng,
					},
					destination: {
						lat: endPoint.lat,
						lng: endPoint.lng,
					},
					travelMode: maps.TravelMode.WALKING,
				},
				(result, status) => {
					if (status === maps.DirectionsStatus.OK) {
						directionsRenderer.setDirections(result);
					} else {
						console.error("error fetching directions " + result);
					}
				}
			);
		}
	};

	return (
		<div className="map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: API_KEY }}
				center={{
					lat: startPoint.lat,
					lng: startPoint.lng,
				}}
				zoom={zoom}
				options={{
					styles: mapStyle,
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
			></GoogleMapReact>
		</div>
	);
};

export default Map;
