import React, {useState} from "react";
import useAxios from "../../utils/useAxios";
import SerachForEdit from "./SerachForEdit";
import Header from "../../components/SearchStretch/Header"

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Edit = () => {

    const {response, error, loading} = useAxios({method: "get", url: URI_STRETCHES});
    const stretches = response;
    const [isSelected, setIsSelected] = useState(false);
    const [stretchToEdit, setstretchToEdit] = useState();


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

		const handleOnSelected = () => {

		}

		const handleOnSubmit = () => {

		}


        let content;
        if (!isSelected) {
            content = <><Header title='MODYFIKUJ ISTNIEJĄCY ODCINEK' subtitle='Podaj szczegóły:'/>
                <SerachForEdit stretches={stretches}
                    startPoints={startPoints}
                    handleOnSelected={handleOnSelected}/></>

        } else {
            content = <>
                EditForm stretch={stretchToEdit}
                handleOnSubmit={handleOnSubmit} </>

        }


        return (
            <></>

        );
    }

};

export default Edit;
