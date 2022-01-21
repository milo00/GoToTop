import React from "react";
import { NavLink } from "../components/NavBar/NavBarElements";

const Stretch = () => {
	return (
		<div className="conteiner">
			<NavLink to="/stretches/add" className="category-elem" activestyle="true">
				<img src={require("../images/add.png")} alt="add" width={"50%"} />
				<h3>DODAJ</h3>
			</NavLink>
			<NavLink
				to="/stretches/remove"
				className="category-elem"
				activestyle="true"
			>
				<img src={require("../images/remove.png")} alt="add" width={"50%"} />
				<h3>USUŃ</h3>
			</NavLink>
			<NavLink
				to="/stretches/edit"
				className="category-elem"
				activestyle="true"
			>
				<img src={require("../images/edit.png")} alt="add" width={"50%"} />
				<h3>MODYFIKUJ</h3>
			</NavLink>
		</div>
	);
};

export default Stretch;
