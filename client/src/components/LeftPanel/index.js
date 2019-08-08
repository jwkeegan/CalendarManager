import React, {Component} from "react";
import Friend from "../Friend";

class LeftPanel extends Component {
    state = {
        email: "",
        name: "",
        friends: [],
        pending: []
    };

    render() {
        return (
            <div className="row align-center">
                <div className="col-lg-12">
                    <div className="row" id="friends-list">
                        {this.state.friends.map(friend => (
                            <Friend 
                                friend={friend.username}
                            />
                        ))}
                    </div>
                    <div className="row" id="pending-list">

                    </div>
                </div>
            </div>
        );
    } 
}

export default LeftPanel;