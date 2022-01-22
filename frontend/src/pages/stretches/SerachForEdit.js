import React, { useState } from "react";
import Select from "react-select";

function getRoutePoint(stretches, id) {
	const pointWithrepetitions = stretches
		.filter((stretch) => stretch.startPoint.id == id)
		.map((stretch) => stretch.startPoint);

	return pointWithrepetitions.find(
		(ele, ind) =>
			ind ===
			pointWithrepetitions.findIndex(
				(elem) => elem.id == ele.id && elem.name == ele.name
			)
	);
}

function SerachForEdit({ stretches, startPoints, handleOnSelected }) {
	const [endPoints, setEndPoints] = useState([]);
	const [middlePoints, setMiddlePoints] = useState([]);

	const [customPlaceholderForEndPoint, setCustomPlaceholderForEndPoint] =
		useState("Najpier wybierz punkt początkowy");
	const [customPlaceholderForMiddlePoint, setCustomPlaceholderForMiddlePoint] =
		useState("Najpier wybierz punkt końcowy");
	const [errorMsg, setErrorMsg] = useState();

	const [startPointValue, setStartPointValue] = useState();
	const [endPointValue, setEndPointValue] = useState();
	const [middlePointValue, setMiddlePointValue] = useState();

	function customTheme(theme) {
		return {
			...theme,
			colors: {
				...theme.colors,
				primary25: "#57b42f",
				primary: "#57b42f",
			},
		};
	}

	function getRoutePoint(stretches, id) {
		return stretches
			.map((stretch) => stretch.startPoint)
			.find((stretch) => stretch.id == id);
	}

	const handleChangeStartPoint = (selectedOption) => {
		setStartPointValue(selectedOption);
		let end = stretches
			.filter((element) => element.startPoint.id == selectedOption.value)
			.map((stretch) => stretch.endPoint)
			.map((point) => {
				return { value: point.id, label: point.name };
			});

		end = end.filter(
			(ele, ind) =>
				ind ===
				end.findIndex(
					(elem) => elem.value === ele.value && elem.label === ele.label
				)
		);

		setEndPointValue(null);
		setMiddlePointValue(null);
		setEndPoints(end);
		setCustomPlaceholderForEndPoint("Wybierz punkt końcowy");
	};

	const handleChangeEndPoint = (selectedOption) => {
		console.log(selectedOption);
		setEndPointValue(selectedOption);

		console.log(startPointValue.value);
		let currentMiddlePoints = stretches
			.filter(
				(element) =>
					element.startPoint.id == startPointValue.value &&
					element.endPoint.id === selectedOption.value &&
					element.middlePoint != ""
			)
			.map((point) => {
				return { value: point.id, label: point.middlePoint };
			});

		currentMiddlePoints = currentMiddlePoints.filter(
			(ele, ind) =>
				ind ===
				currentMiddlePoints.findIndex((elem) => elem.label === ele.label)
		);

		setMiddlePoints(currentMiddlePoints);

		if (currentMiddlePoints.length == 0) {
			setCustomPlaceholderForMiddlePoint("Brak dostępnych punktów pośrednich");
			setMiddlePointValue("");
		} else {
			console.log("in");
			setCustomPlaceholderForMiddlePoint("Wybierz punkt pośredni");
		}
	};

	/*const allFieldsFilled =endPointValues.every((field) => {
        constendPointValue = `${field}`.trim();
        returnendPointValue !== '' &&endPointValue !== '0';
    });*/

	const submitHandler = (e) => {
		e.preventDefault();

		let start = getRoutePoint(stretches, e.target.startPoint.value);
		let end = getRoutePoint(stretches, e.target.endPoint.value);

		console.log(start);

		const stretch = stretches.find(
			(s) => s.startPoint.id === start.id && s.endPoint.id === end.id
		);

		console.log(stretch);
		if (stretch != null) {
			console.log(stretch);
			this.handleOnSelected(stretch);
		}
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="form">
				<div className="form-control">
					<label htmlFor="startPoint">Punkt początkowy:</label>
					<Select
						className="select"
						theme={customTheme}
						id="startPoint"
						name="startPoint"
						options={startPoints}
						isSearchable
						value={startPointValue}
						placeholder="Wybierz punkt początkowy"
						onChange={handleChangeStartPoint}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="endPoint">Punkt końcowy:</label>
					<Select
						className="select"
						theme={customTheme}
						id="endPoint"
						name="endPoint"
						options={endPoints}
						isSearchable
						placeholder={customPlaceholderForEndPoint}
						value={endPointValue}
						onChange={handleChangeEndPoint}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="middlePoint">Punkt pośredni:</label>
					<Select
						className="select"
						theme={customTheme}
						id="middlePoint"
						name="middlePoint"
						options={middlePoints}
						isSearchable
						placeholder={customPlaceholderForMiddlePoint}
						value={middlePointValue}
						onChange={setMiddlePointValue}
					/>
				</div>
				<button type="submit">MODYFIKUJ</button>
			</div>
		</form>
	);
}

export default SerachForEdit;
