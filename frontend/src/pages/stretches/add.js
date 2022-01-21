import React, { useState } from "react";
import useAxios from "../../utils/useAxios";
import Select from "react-select";

const URI_STRETCHES = "http://localhost:8080/scoredStretch";

const Add = () => {
	const { response, error, loading } = useAxios({
		method: "get",
		url: URI_STRETCHES,
	});
	const stretches = response;
	const [endPoints, setEndPoints] = useState([]);
	const [customPlaceholder, setCustomPlaceholder] = useState(
		"Najpier wybierz punkt początkowy"
	);
	const [value, setValue] = useState();

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

	const handleChange = (selectedOption) => {
		let end = stretches
			.filter((element) => element.startPoint.id == selectedOption.value)
			.map((stretch) => stretch.endPoint)
			.map((point) => {
				return { value: point.id, label: point.name };
			});

		console.log(end);

		end = end.filter(
			(ele, ind) =>
				ind ===
				end.findIndex(
					(elem) => elem.value === ele.value && elem.label === ele.label
				)
		);

		setEndPoints(end);
		setValue(null);
		setCustomPlaceholder("Wybierz punkt końcowy");
	};

	const handleChange2 = (selectedOption) => {
		setValue(selectedOption);
	};

	if (loading) {
		return <h1>Loading...</h1>;
	} else if (error) {
		return (
			<error>
				<p>{error}</p>
			</error>
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
				<section className="title">
					<h1>DODAJ NOWY ODCINEK</h1>
					<h3>Podaj szczegóły:</h3>
				</section>

				<div className="form">
					<div className="form-control">
						<label htmlFor="startPoint">Punkt początkowy: </label>
						<Select
							className="select"
							theme={customTheme}
							options={startPoints}
							isSearchable
							placeholder="Wybierz punkt początkowy"
							onChange={handleChange}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="endPoint">Punkt końcowy: </label>
						<Select
							className="select"
							theme={customTheme}
							options={endPoints}
							isSearchable
							placeholder={customPlaceholder}
							value={value}
							onChange={handleChange2}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="middlePoint">Punkt pośredni: </label>
						<input type="text" id="middlePoint" name="middlePoint" />
					</div>
					<div className="form-control">
						<label htmlFor="length">Długość: </label>
						<input type="number" id="length" name="length" />
					</div>
					<div className="form-control">
						<label htmlFor="heightDifference">Suma przewyższeń: </label>
						<input
							type="number"
							id="heightDifference"
							name="heightDifference"
						/>
					</div>
					<div className="form-control">
						<label htmlFor="score">Punkty: </label>
						<input type="number" id="score" name="score" />
					</div>
					<div className="form-control">
						<label htmlFor="walkingTime">Czas przejścia: </label>
						<input type="time" id="walkingTime" name="walkingTime" />
					</div>
					<div className="form-control">
						<label htmlFor="mountainArea">Teren górski: </label>
						<input type="text" id="mountainArea" name="mountainArea" />
					</div>
					<button type="submit">DODAJ</button>
				</div>
			</>
		);
	}
};

export default Add;
