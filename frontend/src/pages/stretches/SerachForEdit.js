import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function SerachForEdit({ stretches, startPoints }) {
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

	const navigate = useNavigate();

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
			setCustomPlaceholderForMiddlePoint("Wybierz punkt pośredni");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let id = stretches.find(
			(element) =>
				element.startPoint.id === startPointValue.value &&
				element.endPoint.id === endPointValue.value &&
				element.middlePoint ===
					(middlePointValue == "" ? "" : middlePointValue.label)
		).id;

		console.log(id);
		console.log(stretches)
		navigate("/stretches/edit/" + id);
	};

	return (
		<form onSubmit={handleSubmit}>
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
