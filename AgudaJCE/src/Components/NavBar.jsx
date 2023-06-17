import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = (props) => {
	const links = [
		{ key: "nav_link_1", name: props.languageHelper.home, path: "/" },
		{
			key: "nav_link_2",
			name: props.languageHelper.manageUsers,
			path: "/manage_users",
		},
		{
			key: "nav_link_3",
			name: props.languageHelper.meetingRoomBookings,
			path: "/meeting_room_bookings",
		},
		{
			key: "nav_link_4",
			name: props.languageHelper.manageMarathons,
			path: "/manage_marathons",
		},
		{
			key: "nav_link_5",
			name: props.languageHelper.manageEvents,
			path: "/manage_events",
		},
		{
			key: "nav_link_6",
			name: props.languageHelper.manageAgudaMembers,
			path: "/manage_aguda_members",
		},
	];

	return (
		<nav className="side_bar">
			<label className={props.lower ? "burger lower" : "burger"}>
				<input type="checkbox" />
			</label>
			<li className="list">
				<h2 id="nav_bar_header">{props.languageHelper.header}</h2>
				{links.map((link) => (
					<Link key={link.key} to={link.path}>
						{link.name}
					</Link>
				))}
			</li>
		</nav>
	);
};

export default NavBar;
