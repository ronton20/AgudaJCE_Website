import React from "react";
import "../css/RoomBooking.css";

function RoomBooking(props) {
	return (
		<tr className="room_booking">
			<td>{props.date}</td>
			<td>{props.timeFrame}</td>
			<td>{props.data.id1}</td>
			<td>{props.data.id2}</td>
			<td>{props.data.id3}</td>
		</tr>
	);
}

export default RoomBooking;
