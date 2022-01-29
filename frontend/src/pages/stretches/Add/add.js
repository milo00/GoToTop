import React, { useState, useCallback } from "react";
import useAxios from "../../../utils/useAxios";
import AddForm from "./AddForm";
import CustomAlert from "../CustomAlert";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Add = () => {
	const [titleClass, setTitleClass] = useState("title");

	const [alertClass, setAlertClass] = useState("alert alert-warning");
	const [alertBtnColor, setAlertBtnColor] = useState("#8a6d3b");
	const [showAlert, setShowAlert] = useState(false);
	const [alertTitle, setAlertTitle] = useState("Coś poszło nie tak");
	const [alertMessage, setAlertMessage] = useState();

	const addStretchHandler = useCallback(async (stretch) => {
		if (stretch.startPoint == null || stretch.endPoint == null) {
			setShowAlert(true);
			setTitleClass("blurred");
			setAlertMessage("Musisz wybrać punkt początkowy i końcowy.");
			return;
		}

		if (stretch.mountainArea1 == null || stretch.mountainArea2 == null) {
			setShowAlert(true);
			setTitleClass("blurred");
			setAlertMessage("Musisz wybrać teren górski nowego odcinka");
			return;
		}

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
			setAlertClass("alert alert-success");
			setAlertBtnColor("#57b42f");
			setTitleClass("blurred");
			setAlertTitle("Udało się!");
			setAlertMessage("Z powodzeniem dodano nowy odcinek.");
		} catch (error) {
			console.log(error.message);

			if (error.message == "Stretch with given name already exists") {
				console.log(alert);

				setShowAlert(true);
				setTitleClass("blurred");
				setAlertMessage(
					"Nie można dodać podanego odcinka, ponieważ już istnieje. Jeżeli chcesz zmienić jego dane, przejdź do sekcji 'edytuj.'"
				);
			} else if (
				error.message ==
				"Cannot add new stretch if the same stretch with empty middle point exists"
			) {
				setShowAlert(true);
				setTitleClass("blurred");
				setAlertMessage(
					"Nie można dodać podanego odcinka, ponieważ istnieje już odcinek o podanym punkcie początkowym i końcowym, ale bez punktu pośredniego. Aby być w stanie dodać nowy odcinek, zedytuj punkt pośredni istniejącego odcinka."
				);
			} else if (
				error.message ==
				"Cannot add new stretch with empty middle point if different middle point for this stretch already exists"
			) {
				setShowAlert(true);
				setTitleClass("blurred");
				setAlertMessage(
					"Nie można dodać podanego odcinka, ponieważ istnieje już odcinek o podanym punkcie początkowym i końcowym. Aby być w stanie dodać nowy odcinek, dodaj punkt pośredni."
				);
			} else if (
				error.message == "Points does not have the same mountain area"
			) {
				setShowAlert(true);
				setTitleClass("blurred");
				setAlertMessage(
					"Nie można dodać podanego odcinka, ponieważ jego punkty znajdują się w innych terenach górskich."
				);
			}
			console.log(error.message);
		}
	}, []);

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
				<CustomAlert
					className={alertClass}
					title={alertTitle}
					message={alertMessage}
					show={showAlert}
					btnColor={alertBtnColor}
				/>
			</>
		);
	}
};

export default Add;
