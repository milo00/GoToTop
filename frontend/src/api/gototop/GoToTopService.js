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
                    <h1>{area.id}</h1>
                </div>
            );
        });
    };

}

export default new GoToTopService();