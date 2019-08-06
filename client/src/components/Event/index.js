import React from "react";

const formatTime = (time) => {
    time = time.split("T")[1].split(":").slice(0, 2);
    let hours = parseInt(time[0]);
    let pm = false;
    if (hours > 12) {
        hours -= 12;
        time[0] = hours;
        pm = true;
    }
    time = time.join(":");
    if (pm) time += " pm";
    else time += " am";
    return time;
}

function Event(props) {
    return (
        <div>
            <div className="text-center">{props.title}</div>
            <div>Start Time: {formatTime(props.startTime)}</div>
            <div>End Time: {formatTime(props.endTime)}</div>
        </div>
    )
}

export default Event;