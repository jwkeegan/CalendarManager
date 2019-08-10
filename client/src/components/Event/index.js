import React from "react";
import "./style.css";

const formatTime = (time) => {
    time = time.split("T")[1].split(":").slice(0, 2);
    console.log(time);
    let hours = parseInt(time[0]);
    let pm = false;
    if (hours >= 12) {
        pm = true;
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (hours === 0) {
        hours = 12;
    }
    time[0] = hours;
    time = time.join(":");
    if (pm) time += " pm";
    else time += " am";
    return time;
}

function Event(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="text-center card-title" id="friend-name">{props.title}</div>
                {props.startTime.includes("T") ? (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Start Time: {formatTime(props.startTime)}</li>
                        <li className="list-group-item">End Time: {formatTime(props.endTime)}</li>
                    </ul>
                ) : (
                        <div className="card-text">All day Event</div>
                    )}
            </div>
        </div>
    )
}

export default Event;