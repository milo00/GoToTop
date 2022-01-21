import React from "react";

const AddFormNewPoint = () => {
	return (
		<div>
			<div className="form-control">
				<label htmlFor="name">Nazwa: </label>
				<input className="new-point" type="text" id="name" name="name" />
			</div>
			<div className="form-control">
				<label htmlFor="heightDifference">Długość geograficzna: </label>
				<input
					className="new-point"
					type="number"
					step="0.000001"
					id="heightDifference"
					name="heightDifference"
				/>
			</div>
			<div className="form-control">
				<label htmlFor="score">Szerokość geograficzna: </label>
				<input
					className="new-point"
					type="number"
					step="0.000001"
					id="score"
					name="score"
				/>
			</div>
			<div className="form-control">
				<label htmlFor="walkingTime">Wysokość: </label>
				<input
					className="new-point"
					type="number"
					step="0.01"
					id="height"
					name="height"
				/>
			</div>
			<div className="form-control">
				<label htmlFor="monutainAreas">Tereny: </label>
				<input
					className="new-point"
					type="text"
					id="monutainAreas"
					name="monutainAreas"
				/>
			</div>
		</div>
	);
};

export default AddFormNewPoint;
