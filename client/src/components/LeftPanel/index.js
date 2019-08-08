import React from "react";
import Friend from "../Friend";

function LeftPanel(props) {
    return (
        <div className="row align-center">
            <div className="col-lg-12">
                <div className="row list" id="friends-list">
                    <h2>Friends List</h2>
                    {props.friends.map(friend => (
                        <Friend
                            friend={friend.username}
                        />
                    ))}
                </div>
                <div className="row list" id="pending-list">
                    <h2>Pending Friends</h2>
                    {props.pending.map(friend => (
                        <Friend
                            friend={friend.username}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LeftPanel;