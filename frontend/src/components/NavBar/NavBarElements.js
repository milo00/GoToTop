import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: #57b42f;
	height: 60px;
	display: flex;
	//   justify-content: space-between;
	padding: 0.7rem;
	z-index: 10;

	/* Third Nav */
	justify-content: flex-start;
`;

export const NavLink = styled(Link)`
	color: #b6ee9f;
	font-weight: 300;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	cursor: pointer;
	&.active {
		color: #fff;
	}
`;

export const Bars = styled(FaBars)`
	display: none;
	color: #fff;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	//  margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */

	/* Third Nav */
	width: 100vw;
	white-space: nowrap;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 24px;

	/* Third Nav */
	justify-content: center;
	width: 100vw;

	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled(Link)`
	border-radius: 4px;
	font-weight: 300;
	background: #57b42f;
	padding: 10px 22px;
	color: #fff;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	/* Second Nav */
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #b6ee9f;
		color: #fff;
	}
`;
