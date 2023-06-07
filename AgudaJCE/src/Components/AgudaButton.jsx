import React from "react";

function AgudaButtonUI(props) {
    return (
        <button className="submit_button" id={props._id} value={props.value} onClick={props.onClick} disabled={props.disabled}>
            {props.button_text}
        </button>
    );
}

export default AgudaButtonUI;