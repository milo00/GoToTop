import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import EditForm from "./EditForm";
import { NavBtn, NavBtnLink } from "../../../components/NavBar/NavBarElements";

const URI_STRETCHES = "http://localhost:8080/scoredStretch/";

const EditSpecificStretch = ({ stretches }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [titleClass, setTitleClass] = useState("title");
	const [showAlert, setShowAlert] = useState(false);

	const { id } = useParams();

	const stretchToEdit = stretches.find((s) => s.id == id);

	const editStretchHandler = useCallback(async (stretch) => {
		console.log(stretch);

		const formData = new FormData();

		formData.append("middlePoint", stretch.middlePoint);
		formData.append("score", stretch.score);
		formData.append("length", stretch.length);
		formData.append("heighDifference", stretch.heightDifference);
		formData.append("walkingTime", stretch.walkingTime);

		let uri = URI_STRETCHES + stretch.stretchId;

		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(uri, {
				method: "PUT",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			console.log(response);
			setShowAlert(true);
			setTitleClass("blurred");
		} catch (error) {
			setError(error.message);
			console.log(error);
		}
		setIsLoading(false);
	}, []);

	return (
		<>
			<section className={titleClass}>
				<h1>
					{stretchToEdit.startPoint.name + " - " + stretchToEdit.endPoint.name}
				</h1>
				<h3>Wprowdź dane, które chcesz zmodyfikować:</h3>
			</section>
			<EditForm
				stretchToEdit={stretchToEdit}
				onEditHandle={editStretchHandler}
				show={!showAlert}
			/>
			<div className="alert-conteiner">
				<Alert
					className="alert alert-success"
					show={showAlert}
					variant="success"
				>
					<h3 class="alert-heading">Udało się!</h3>
					<hr />
					<p> Z powodzeniem zedytowano odcinek.</p>

					<NavBtn className="btn">
						<NavBtnLink to="/stretches">POWRÓT</NavBtnLink>
					</NavBtn>
				</Alert>
			</div>
		</>
	);
};

export default EditSpecificStretch;
