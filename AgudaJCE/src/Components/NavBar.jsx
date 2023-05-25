import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = (props) => {
	return (
		<nav>
			{/* <img src="./Assets/Logo1.png" alt="Blup_logo" /> */}
			<label className="burger">
				<input type="checkbox" />
			</label>
			<li className="list">
				<h2 id="nav_bar_header">{props.languageHelper.header}</h2>
				{props.links.map((link) => (
					<Link key={link.key} to={link.path}>
						{link.name}
					</Link>
				))}
			</li>
		</nav>
	);
};

export default NavBar;
