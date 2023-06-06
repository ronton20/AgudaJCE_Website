import React from "react";
import InputField from "./InputField";


function SchedualMeetingRoom(){

    return(
        <div className="container glassify">
            <form className="container" action="">
                <InputField label={"First Student Id:"} type={'tel'} _id={"student_id_1"}></InputField>
                <InputField label={"Second Student Id:"} type={'tel'} _id={"student_id_1"}></InputField>
                <InputField label={"Third Student Id:"} type={'tel'} _id={"student_id_1"}></InputField>
            </form>
        </div>
    )
}

export default SchedualMeetingRoom;