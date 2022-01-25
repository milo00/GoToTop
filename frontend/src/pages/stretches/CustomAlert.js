import React from "react";
import { Alert } from "react-bootstrap";
import { NavBtnLink, NavBtn } from "../../components/NavBar/NavBarElements";

const CustomAlert = ({ className, title, message, show, btnColor }) => {
	return (
		<div className="alert-conteiner">
			<Alert className={className} show={show}>
				<h3 className="alert-heading">{title}</h3>
				<hr />
				<p>{message}</p>

				<NavBtn className="btn">
					<NavBtnLink to="/stretches" style={{ background: btnColor }}>
						POWRÓT
					</NavBtnLink>
				</NavBtn>
			</Alert>
		</div>
	);
};

export default CustomAlert;
