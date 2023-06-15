import React, { useState } from "react";
import "../css/InputField.css";

const InputField = ({ label, type, _id, _name = "" , pattern = null, maxlength = "250" }) => {
	const [value, setValue] = useState("");
	const id = `input_field_${_id}`;

	return (
		<div className="input_field">
			<label>{label}:</label>
			<input
				id={id}
				type={type}
				pattern={pattern}
				maxLength={maxlength}
				value={value}
				name={_name}
				required
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default InputField;
