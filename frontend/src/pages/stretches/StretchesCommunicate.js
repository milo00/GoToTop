import React from "react";
import { NavBtn, NavBtnLink } from "../../components/NavBar/NavBarElements";

const StretchesCommunicate = ({ route }) => {
	const communicate = route.params;
	return (
		<div>
			<h1 className="communicate">{communicate}</h1>
			<NavBtn>
				<NavBtnLink to="/stretches">POWRÓT</NavBtnLink>
			</NavBtn>
		</div>
	);
};

export default StretchesCommunicate;
