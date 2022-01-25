import React from "react";
import PropTypes from "prop-types";

function Header({ title, subtitle = null }) {
	return (
		<section className="title">
			<h1>{title}</h1>
			<div className="subtitle">
				<h3>{subtitle || ""}</h3>
			</div>
		</section>
	);
}

Header.propTypes = {};

export default Header;
