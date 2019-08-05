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
        console.log(this.state);
        API.getUsers().then((res) => {
            console.log(res);
        });

        API.createUser({
            username: this.state.name,
            email: this.state.email
        }).then(res => console.log(res));
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