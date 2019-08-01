import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class RightPanel extends Component {
    state = {
        email: "",
        name: ""
    };

    handleClickOutside = () => {
        const curUser = document.getElementById("user-name-holder");
        this.setState({
            email: curUser.getAttribute("data-email"),
            name: curUser.getAttribute("data-name")
        });
    }

    render() {
        return (
            <div className="row text-center">
                {this.state.name}
            </div>
        );
    }
}

export default onClickOutside(RightPanel);