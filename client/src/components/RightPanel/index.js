import React, { Component } from "react";
// import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";

class RightPanel extends Component {
    state = {
        email: "",
        name: ""
    };

    viewDate = (event) => {
        event.preventDefault();
        const curUser = document.getElementById("user-name-holder");
        this.setState({
            email: curUser.getAttribute("data-email"),
            name: curUser.getAttribute("data-name")
        });
        if (this.state.name !== "") {
            this.handleLogin();
        }
    }

    handleLogin = () => {
        let newUser = true;
        let eventsArray = [];
        let eventsToLoad = document.getElementById("hidden-div").getAttribute("data-to-store");
        for (let i = 0; i < eventsToLoad; i++) {
            let event = document.getElementById("event-" + i);
            let eventObject = {
                title: event.getAttribute("data-title"),
                startTime: event.getAttribute("data-start-time"),
                endTime: event.getAttribute("data-end-time")
            };
            eventsArray.push(eventObject);
        }
        console.log(eventsArray);

        API.getUsers().then((res) => {
            for (var user in res.data) {
                if (res.data[user].email === this.state.email) {
                    newUser = false;
                }
            }
        });

        if (newUser) {
            API.createUser({
                username: this.state.name,
                email: this.state.email,
                events: eventsArray
            }).then(res => console.log(res));
        }

    }

    render() {
        return (
            <div className="row text-center">
                <p>Day View</p>
                <form method="post">
                    <div className="form-group">
                        <label className="control-label" htmlFor="date">Date</label>
                        <input className="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary " name="submit" type="submit" onClick={this.viewDate}>View Date</button>
                    </div>
                </form>
                <div id="hidden-div"></div>
            </div>
        );
    }
}

// export default onClickOutside(RightPanel);
export default RightPanel;