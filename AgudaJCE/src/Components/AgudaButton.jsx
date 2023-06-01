import React from "react";

import '../pages/MeetingRooms.css';

function AgudaButtonUI({ button_text , value}){
    return(
        <div className="button_container">
            <button value={value}>
                {button_text}
            </button>
        </div>
    );
}

export default AgudaButtonUI;