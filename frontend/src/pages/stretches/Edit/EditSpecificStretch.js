import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import EditForm from "./EditForm";
import CustomAlert from "../CustomAlert";

const URI_STRETCHES = "http://localhost:8080/scoredStretch/";

const EditSpecificStretch = ({ stretches }) => {
	const [isLoading, setIsLoading] = useState(false);

	const [titleClass, setTitleClass] = useState("title");

	const [alertClass, setAlertClass] = useState("alert alert-success");
	const [alertBtnColor, setAlertBtnColor] = useState("#57b42f");
	const [showAlert, setShowAlert] = useState(false);
	const [alertTitle, setAlertTitle] = useState("Udało się!");
	const [alertMessage, setAlertMessage] = useState(
		"Z powodzeniem zedytowano odcinek."
	);

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
		try {
			const response = await fetch(uri, {
				method: "PUT",
				body: formData,
			});

			const data = await response.text();

			if (!response.ok) {
				throw new Error(data);
			}

			console.log(response);
		} catch (error) {
			if (error.message == "Stretch with given name already exists") {
				console.log(alert);

				setShowAlert(true);
				setAlertClass("alert alert-warning");
				setAlertBtnColor("#8a6d3b");
				setTitleClass("blurred");
				setAlertTitle("Coś poszło nie tak");
				setAlertMessage(
					"Nie można zedytować podanego odcinka, ponieważ istnieje inny odcinek o takim samym punkcie początkowym, końcowym oraz środkowym."
				);
			} else if (
				error.message ==
				"Cannot delete middle point if different middle point for the stretch still exists"
			) {
				console.log(alert);

				setShowAlert(true);
				setAlertClass("alert alert-warning");
				setAlertBtnColor("#8a6d3b");
				setTitleClass("blurred");
				setAlertTitle("Coś poszło nie tak");
				setAlertMessage(
					"Nie można zedytować podanego odcinka, ponieważ istnieje inny odcinek o podanym punkcie początkowym i końcowym. Aby można było poprawnie je zidentyfikować, dodaj punkt pośredni"
				);
			}
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
			<CustomAlert
				className={alertClass}
				title={alertTitle}
				message={alertMessage}
				show={showAlert}
				btnColor={alertBtnColor}
			/>
		</>
	);
};

export default EditSpecificStretch;
