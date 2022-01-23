import React from 'react';
import GoogleMapReact from "google-map-react";
import google from "google-map-react"
import {useState} from "react";

const API_KEY = 'AIzaSyBo1ZuSnpC7veiRPcToeJwn6sNHlHeiQAg';

const Map = (lng, lat, zoom = 10) => {
    const [currentLocation, setCurrentLocation] = useState({lat: 49.26123, lng: 20.09037});


    const apiIsLoaded = (map, maps) => {
        // const directionsService = new google.maps.DirectionsService();
        // const directionsRenderer = new google.maps.DirectionsRenderer();
        // directionsRenderer.setMap(map);
        const origin = {
            lat: 49.756795,
            lng: -73.954298
        };
        const destination = {
            lat: 41.756795,
            lng: -78.954298
        };


        /*
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };*/
        return (
            <div>
                <div style={
                    {
                        height: '100vh',
                        width: '100%'
                    }
                }>
                    <GoogleMapReact bootstrapURLKeys={
                            {key: API_KEY}
                        }
                        defaultCenter={currentLocation}
                        defaultZoom={zoom}

                        //yesIWantToUseGoogleMapApiInternals
                        //onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                    />
                </div>
            </div>
        );
    }

}

export default Map;
