import React, { useState } from "react";
import Select from "react-select";

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

const EditForm = ({ stretches, startPoints, stretchToEdit }) => {
	const [endPoints, setEndPoints] = useState([]);
	const [customPlaceholder, setCustomPlaceholder] = useState(
		"Najpier wybierz punkt początkowy"
	);

    const [stretch, setStretch] = useState({
        middlePoint: stretchToEdit ? stretchToEdit.middlePoint : '',
        distance: stretchToEdit ? stretchToEdit.length : '',
        heightDifference: stretchToEdit ? stretchToEdit.heightDifference : '',
        walkingTime: stretchToEdit ? stretchToEdit.walkingTime : '',
        score: stretchToEdit ? stretchToEdit.score : ''
      });

	const [value, setValue] = useState();

	const handleChange2 = (selectedOption) => {
		setValue(selectedOption);
	};

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

	return (
		<div>
			<div className="form">
				<div className="new-checkox-included">
					<input type="checkbox" id="new1" name="new1" value="new1" />
					<label id="new" for="new1">
						nowy
					</label>
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
				<div className="new-checkox-included">
					<input type="checkbox" id="new1" name="new1" value="new1" />
					<label id="new" for="new1">
						nowy
					</label>
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
					<input type="number" id="heightDifference" name="heightDifference" />
				</div>
				<div className="form-control">
					<label htmlFor="score">Punkty: </label>
					<input type="number" id="score" name="score" />
				</div>
				<div className="form-control">
					<label htmlFor="walkingTime">Czas przejścia: </label>
					<input type="time" id="walkingTime" name="walkingTime" />
				</div>
				<button type="submit">DODAJ</button>
			</div>
		</div>
	);
};

export default EditForm;