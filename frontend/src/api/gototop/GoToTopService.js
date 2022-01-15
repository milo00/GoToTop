import axios from "axios";
import React, { useEffect, useState} from "react";

class GoToTopService {

    MountainAreasData = () => {
        const [MountainAreasData, setMountainAreasData] = useState([]);
    
        const fetchAreas = () => {
            axios.get('http://localhost:8080/mountainArea').then(res => {
               console.log(res);
               setMountainAreasData(res.data);
           })
        };
    
        useEffect(() => {
            fetchAreas();
        }, []);
    
        return MountainAreasData.map((area,index) => {
            return (
                <div key={index}>
                    <h3>{area.name}</h3>
                </div>
            );
        });
    };

    RoutePointsData = () => {
        const [RoutePointsData, setRoutePointsData] = useState([]);
    
        const fetchPoints = () => {
            axios.get('http://localhost:8080/routePoint').then(res => {
               console.log(res);
               setRoutePointsData(res.data);
           })
        };
    
        useEffect(() => {
            fetchPoints();
        }, []);
    
        return RoutePointsData.map((point,index) => {
            return (
                <div key={index}>
                    <h3>{point.name}</h3>
                    <p>({point.latitude},{point.longitude},{point.altitude})</p>

                </div>
            );
        });
    };

    ScoredStretchData = () => {
        const [ScoredStretchData, setScoredStretchData] = useState([]);
    
        const fetchStretches = () => {
            axios.get('http://localhost:8080/scoredStretch').then(res => {
               console.log(res);
               setScoredStretchData(res.data);
           })
        };
    
        useEffect(() => {
            fetchStretches();
        }, []);
    
        return ScoredStretchData.map((stretch,index) => {
            return (
                <div key={index}>
                    <h3>{stretch.score}</h3>
                </div>
            );
        });
    };

}

export default new GoToTopService();