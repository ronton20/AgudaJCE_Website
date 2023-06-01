import React from "react";

import '../pages/MeetingRooms.css';

function AgudaButtonUI({ button_text, value }) {
    return (
        <button className="submit_button" value={value}>
            {button_text}
        </button>
    );
}

export default AgudaButtonUI;