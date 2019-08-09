import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";

class Create extends Component {
    state = {
        email: "",
        name: "",
        friends: [],
    }

    handleClickOutside = () => {
        let curUserEmail = document.getElementById("user-name-holder").getAttribute("data-email");
        console.log(curUserEmail);
        if (curUserEmail !== this.state.email && this.state.email !== "") {
            this.setState({
                email: "",
                name: "",
                friends: [],
            });
        } else if (curUserEmail !== "") {
            console.log("got to this point");
            this.loadProfile(curUserEmail)
        }
    }

    loadProfile = (email) => {
        API.getUser(email).then(res => {
            let friendsArray = this.sortFriends(res.data.friends);
            this.setState({
                email: res.data.email,
                name: res.data.name,
                friends: friendsArray
            });
        });
    }

    sortFriends = (friends) => {
        let friendsArray = [];
        for (let friend in friends) {
            if (!friends[friend].pending) {
                friendsArray.push(friends[friend]);
            }
        }
        return friendsArray;
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default onClickOutside(Create);