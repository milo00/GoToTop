import React from "react";
import { NavBtn, NavBtnLink } from "../components/NavBar/NavBarElements";

const Home = () => {
	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "70vh",
				}}
			>
				<img src={require("../images/logo.png")} alt="logo" width={"40%"} />
			</div>
			<section
				style={{
					display: "flex",
				}}
			>
				<NavBtn>
					<NavBtnLink to="/search">Wyszukaj Trasę</NavBtnLink>
				</NavBtn>
				<NavBtn>
					<NavBtnLink to="/profile">Zaloguj</NavBtnLink>
				</NavBtn>
			</section>
		</>
	);
};

export default Home;
