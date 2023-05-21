import React, { useState } from "react";
import "../css/InputField.css";

const InputField = ({ label, type }) => {
    const [value, setValue] = useState("");
    const id = `input_field_${label.replace(" ", "_")}`;

    return (
        <div className="input_field">
            <label>{label}:</label>
            <input
                id={id}
                type={type}
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
};

export default InputField;
