import React, {useCallback} from "react";
import {Route, useParams} from "react-router-dom";
import {useState} from "react";
import moment from "moment";
import Header from "../../components/UI/Header";
import {useNavigate, useLocation} from "react-router-dom";
import EditForm from "./EditForm";
import axios from "axios";

const URI_STRETCHES = "http://localhost:8080/scoredStretch/";

const EditSpecificStretch = ({stretches}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const {id} = useParams();

    const navigate = useNavigate();

    const stretchToEdit = stretches.find(s => s.id == id);

    const editStretchHandler = useCallback(async (stretch) => {

        console.log(stretch);

        const formData = new FormData();

        formData.append("middlePoint", stretch.middlePoint)
        formData.append("score", stretch.score)
        formData.append("length", stretch.length)
        formData.append("heighDifference", stretch.heightDifference)
        formData.append("walkingTime", stretch.walkingTime)


        let uri = URI_STRETCHES + stretch.stretchId

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(uri, {
                method: 'PUT',
                body: formData
            });

            if (! response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);


    /*
            const [response, setResponse] = useState(null);
            const [error, setError] = useState('');
            const [loading, setloading] = useState(true);

            axios.put(uri, formData).then((res) => {
                console.log(res);
            }).catch((err) => {
                setError(err);
            }). finally(() => {
                setloading(false);
            });*/


    return(< EditForm stretchToEdit = {
        stretchToEdit
    }
    onEditHandle = {
        editStretchHandler
    } />)
};


export default EditSpecificStretch;
