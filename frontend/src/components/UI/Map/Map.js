import React from 'react';
import GoogleMapReact from "google-map-react";
import Marker from "google-map-react";
import google from "google-map-react"
import {useState} from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const Map = ({
    startName='',
    endName='',
    startLng = 20.09037,
    startLat = 49.26123,
    endLng = 20.087708,
    endLat = 49.28219,
    zoom = 10,
    showMarker = false,
    showRoute = false
}) => {

    console.log(startName)
    const startPoint = {lng: startLng, lat: startLat};
    const endPoint = {lng: endLng, lat: endLat};

    const mapStyle = [
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#eeeeee",
                    },
                ],
            },
            {
                featureType: "poi",
                elementType: "labels.text",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#9e9e9e",
                    },
                ],
            },
        ];

    

    const apiIsLoaded = (map, maps) => {


        if (showMarker) {
            let marker = new maps.Marker({

                position: {
                    lng: startPoint.lng,
                    lat: startPoint.lat
                },

                label:startName,

                map,
            });
            return marker;

        }
        if (showRoute) {
            const directionsService = new maps.DirectionsService();
            const directionsRenderer = new maps.DirectionsRenderer();
            directionsRenderer.setMap(map);


            directionsService.route({
                origin: {
                    lat: startPoint.lat,
                    lng: startPoint.lng
                },
                destination: {
                    lat: endPoint.lat,
                    lng: endPoint.lng
                },
                travelMode: maps.TravelMode.WALKING
            }, (result, status) => {
                if (status === maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error('error fetching directions ${result}');
                }
            });

        }

    };

    return (
        <div className='map'>
            <GoogleMapReact bootstrapURLKeys={
                    {key: API_KEY}
                }

                center={
                    {
                        lat: startPoint.lat,
                        lng: startPoint.lng
                    }
                }
                zoom={zoom}
                options={{
                    styles: mapStyle,
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={
                    ({map, maps}) => apiIsLoaded(map, maps)
            }></GoogleMapReact>
        </div>
    );


}

export default Map;
