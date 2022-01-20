import axios from "axios";
import { useEffect, useState} from "react";

class GoToTopService {

    MountainAreasData = () => {
        const [MountainAreasData, setMountainAreasData] = useState([]);
    
        const fetchAreas = () => {
            axios.get('http://localhost:8080/mountainArea').then(res => {
               
               setMountainAreasData(res.data);
           })
        };
    
        useEffect(() => {
            fetchAreas();
        });
    
        return MountainAreasData;
    };

    RoutePointsData = () => {
        const [RoutePointsData, setRoutePointsData] = useState([]);
    
        const fetchPoints = () => {
            axios.get('http://localhost:8080/routePoint').then(res => {
               
               setRoutePointsData(res.data);
           })
        };
    
        useEffect(() => {
            fetchPoints();
        });
    
        return RoutePointsData;
    };

    ScoredStretchData = () => {
        const [ScoredStretchData, setScoredStretchData] = useState([]);
    
        const fetchStretches = () => {
            axios.get('http://localhost:8080/scoredStretch').then(res => {
               
               setScoredStretchData(res.data);
           })
        };
    
        useEffect(() => {
            fetchStretches();
        });
    
        return ScoredStretchData;
    };

}

export default new GoToTopService();