import React, { useState, useCallback } from "react";
import useAxios from "../../../utils/useAxios";
import AddForm from "./AddForm";
import { Alert } from "react-bootstrap";
import { NavBtnLink, NavBtn } from "../../../components/NavBar/NavBarElements";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Add = () => {
	const [errorPost, setErrorPost] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [titleClass, setTitleClass] = useState("title");

	const addStretchHandler = useCallback(async (stretch) => {

		try {
			const response = await fetch(URI_STRETCHES, {
				method: "POST",
				body: JSON.stringify(stretch),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.text();

			
			if (!response.ok) {
				throw new Error(data);
			}			

			setShowAlert(true);			
			setTitleClass("blurred");

		} catch (error) {
			console.log(error.message);
			setErrorPost(error.message);
		}
	}, []);

	//getting stretches to use them in form
	const { response, error, loading } = useAxios({
		method: "get",
		url: URI_STRETCHES,
	});
	const stretches = response;

	if (loading) {
		return <h1>Loading...</h1>;
	} else if (error) {		
		return (
			<div className="error">
				<h3>{error}</h3>
			</div>
		);
	} else {
		const stretchStartRoutePoints = stretches
			.map((stretch) => stretch.startPoint)
			.filter(
				(ele, ind) =>
					ind ===
					stretches.findIndex(
						(elem) =>
							elem.startPoint.id === ele.id && elem.startPoint.name === ele.name
					)
			);

		const startPoints = stretchStartRoutePoints.map((stretch) => {
			return { value: stretch.id, label: stretch.name };
		});

		return (
			<>
				<section className={titleClass}>
					<h1>DODAJ NOWY ODCINEK</h1>
					<h3>Podaj szczegóły:</h3>

					<AddForm
						stretches={stretches}
						startPoints={startPoints}
						onAddStretch={(stretch) => addStretchHandler(stretch)}
						show={!showAlert}
					/>
				</section>
				<div className="alert-conteiner">
					<Alert
						className="alert alert-success"
						show={showAlert}
						variant="success"
					>
						<h3 class="alert-heading">Udało się!</h3>
						<hr />
						<p> Z powodzeniem dodano nowy odcinek.</p>

						<NavBtn className="btn">
							<NavBtnLink to="/stretches">POWRÓT</NavBtnLink>
						</NavBtn>
					</Alert>
				</div>
			</>
		);
	}
};

export default Add;
