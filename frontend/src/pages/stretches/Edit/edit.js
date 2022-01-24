import React, {useState} from "react";
import useAxios from "../../../utils/useAxios";
import SerachForEdit from "./SerachForEdit";
import Header from "../../../components/UI/Header";
import EditForm from "./EditForm";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Edit = () => {
    const {response, error, loading} = useAxios({method: "get", url: URI_STRETCHES});
    const stretches = response;    
    

    if (loading) {
        return <h1>Loading...</h1>;
    } else if (error) {
        return (
            <error>
                <p>{error}</p>
            </error>
        );
    } else {
        const stretchStartRoutePoints = stretches.map((stretch) => stretch.startPoint).filter((ele, ind) => ind === stretches.findIndex((elem) => elem.startPoint.id === ele.id && elem.startPoint.name === ele.name));

        const startPoints = stretchStartRoutePoints.map((stretch) => {
            return {value: stretch.id, label: stretch.name};
        });

        return (
            <>
                <Header title="MODYFIKUJ ISTNIEJĄCY ODCINEK" subtitle="Podaj szczegóły:"/>
                <SerachForEdit stretches={stretches}
                    startPoints={startPoints}/>
            </>
        );

    }
};

export default Edit;
