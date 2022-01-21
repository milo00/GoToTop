import React from "react";

const Add = () => {
	return (
		<>
			<section className="title">
				<h1>DODAJ NOWY ODCINEK</h1>
				<h3>Podaj szczegóły:</h3>
			</section>
			<div className="form">
				<div className="form-control">
					<label htmlFor="startPoint">Punkt początkowy: </label>
					<input type="text" id="startPoint" name="startPoint" />
				</div>
				<div className="form-control">
					<label htmlFor="endPoint">Punkt końcowy: </label>
					<input type="text" id="endPoint" name="endPoint" />
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
				<div className="form-control">
					<label htmlFor="mountainArea">Teren górski: </label>
					<input type="text" id="mountainArea" name="mountainArea" />
				</div>
				<button type="submit">DODAJ</button>
			</div>
		</>
	);
};

export default Add;
