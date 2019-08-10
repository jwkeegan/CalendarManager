import React, { Component } from "react";
import API from "../../utils/API";
import Friend from "../../components/Friend";
import Center from "../../components/Center";
import Event from "../../components/Event";
import onClickOutside from "react-onclickoutside";
// import RightPanel from "../../components/RightPanel";
import "./style.css";

class Dashboard extends Component {
    state = {
        panels: [
            "col-lg-2  ",
            "col-lg-2  "
        ],
        email: "",
        name: "",
        events: [],
        eventsToView: [],
        friends: [],
        // pending: []
    }

    handleClickOutside = () => {
        if (document.getElementById("user-name-holder").getAttribute("data-name") !== this.state.username) {
            this.setState({
                email: "",
                name: "",
                events: [],
                eventsToView: [],
                friends: [],
                // pending: []
            });
        }
    }

    loadProfile = () => {
        console.log(this.state);
        const curUser = document.getElementById("user-name-holder");
        let newEmail = curUser.getAttribute("data-email");
        let newName = curUser.getAttribute("data-name");
        this.setState({
            email: newEmail,
            name: newName
        });
        if (newName !== "") {
            this.handleLogin();
        } else {
            document.getElementById("authorize_button").click();
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

        API.getUsers().then((res) => {
            for (var user in res.data) {
                if (res.data[user].email === this.state.email) {
                    newUser = false;
                    break;
                }
            }

            if (newUser) {
                API.createUser({
                    username: this.state.name,
                    email: this.state.email,
                    events: eventsArray,
                    friends: [
                        // {
                        //     username: "ex 1",
                        //     email: "123@ex.com",
                        //     // pending: true
                        // },
                        // {
                        //     username: "ex 2",
                        //     email: "456@ex.com",
                        //     // pending: false
                        // }
                    ]
                }).then(res => this.updateUser(res.data));
            } else {
                // console.log(eventsArray);
                API.updateUser(this.state.email, {
                    "$set": {
                        events: eventsArray
                    }
                }).then(res => this.updateUser(res.data));
            }

        });

    }

    updateUser = (userData) => {
        let newEvents = userData.events;
        // let newFriends = [];
        // let newPending = [];

        // for (let friend in userData.friends) {
        //     if (userData.friends[friend].pending) {
        //         newPending.push(userData.friends[friend]);
        //     } else {
        //         newFriends.push(userData.friends[friend]);
        //     }
        // }

        // let dateToShow = document.getElementById("date").value;
        // // console.log(events);
        // const errorDiv = document.getElementById("error-messages");
        // // const eventsDiv = document.getElementById("events-div");
        // // eventsDiv.textContent = "";
        // if (dateToShow === "") {
        //     errorDiv.textContent = "Enter Date";
        // }
        // else if (dateToShow.split("-").length !== 3 ||
        //     dateToShow.split("-")[0].length !== 4 ||
        //     dateToShow.split("-")[1].length !== 2 ||
        //     dateToShow.split("-")[2].length !== 2) {
        //     errorDiv.textContent = "Incorrect Date Format";
        // }
        // else {
        //     errorDiv.textContent = "";
        //     for (var event in events) {
        //         let startTimeSplit = events[event].startTime.split("T");
        //         if (startTimeSplit[0] === dateToShow) {
        //             // console.log("match found");
        //             newEvents.push(events[event]);
        //         }
        //     }
        // }

        this.setState({
            events: newEvents,
            friends: userData.friends,
            // pending: newPending
        });
    }

    viewDate = (event) => {
        event.preventDefault();
        let eventsToLoad = [];
        let dateToShow = document.getElementById("date").value;
        console.log(dateToShow);
        let eventArray = this.state.events;
        for (let event in eventArray) {
            if (eventArray[event].startTime.split("T")[0] === dateToShow) {
                eventsToLoad.push(eventArray[event]);
            }
        }
        console.log(eventsToLoad);
        this.setState({
            eventsToView: eventsToLoad
        });
    }

    changeLeft = (event) => {
        event.preventDefault();

        if (this.state.panels[0] !== "d-none") {
            this.setState({
                panels: [
                    "d-none",
                    this.state.panels[1]
                ]
            });
            document.getElementById("left-control").textContent = ">";
        } else {
            this.setState({
                panels: [
                    "col-lg-2  ",
                    this.state.panels[1]
                ]
            });
            document.getElementById("left-control").textContent = "<";
        }
    }

    changeRight = (event) => {
        event.preventDefault();

        if (this.state.panels[1] !== "d-none") {
            this.setState({
                panels: [
                    this.state.panels[0],
                    "d-none"
                ]
            });
            document.getElementById("right-control").textContent = "<";
        } else {
            this.setState({
                panels: [
                    this.state.panels[0],
                    "col-lg-2  "
                ]
            });
            document.getElementById("right-control").textContent = ">";
        }
    }

    userSearch = (event) => {
        event.preventDefault();
        let query = document.getElementById("add-friend").value;
        API.getUser(query).then(res => {
            if (res.data === null || res.data.length) {
                document.getElementById("search-error").textContent = "Email not registered";
            } else {
                document.getElementById("search-error").textContent = "";
                console.log(res.data);
                let newFriendArray = res.data.friends;
                newFriendArray.push({
                    username: this.state.name,
                    email: this.state.email,
                    // pending: false
                });
                API.updateUser(query, {
                    "$set": {
                        friends: newFriendArray
                    }
                });
                let newFriendUsername = res.data.username;
                API.getUser(this.state.email).then(res => {
                    let userFriendArray = res.data.friends;
                    userFriendArray.push({
                        username: newFriendUsername,
                        email: query,
                        // pending: true
                    });
                    API.updateUser(this.state.email, {
                        "$set": {
                            friends: userFriendArray
                        }
                    }).then(res => this.updateUser(res.data));
                });
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={this.state.panels[0]} id="left-panel">
                        <div className="row overflow-auto" id="friends-list">
                            <h2>Friends List</h2>
                            {this.state.friends.map(friend => (
                                <Friend
                                    key={friend._id}
                                    friend={friend.username}
                                    email={friend.email}
                                    userEmail={this.state.email}
                                />
                            ))}
                        </div>
                        {/* <div className="row list" id="pending-list">
                            <h2>Pending Friends</h2>
                            {this.state.pending.map(friend => (
                                <Friend
                                    key={friend._id}
                                    friend={friend.username}
                                    email={friend.email}
                                    userEmail={this.state.email}
                                />
                            ))}
                        </div> */}
                        <div className="row left-panel" id="user-search-area">
                            <h2>Add Friend</h2>
                            <form method="post">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="add-friend">Enter Email to search</label>
                                    <input className="form-control" id="add-friend" name="add-friend" placeholder="example@gmail.com" type="text" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary " name="submit" type="submit" onClick={this.userSearch}>Search</button>
                                </div>
                            </form>
                            <div id="search-error"></div>
                        </div>
                        {/* <LeftPanel
                            friends={this.state.friends}
                            pending={this.state.pending}
                        /> */}
                    </div>
                    <div className="col text-center" id="center-body">
                        <button id="left-control" onClick={this.changeLeft}>&lt;</button>
                        <button id="right-control" onClick={this.changeRight}>&gt;</button>
                        <p id="page-load" onClick={this.loadProfile}>Click here to load Google Profile</p>
                        <Center />
                    </div>
                    <div className={this.state.panels[1]} id="right-panel">
                        <div className="row text-center" id="day-view-form">
                            <h2>Day View</h2>
                            <form method="post">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="date">Date</label>
                                    <input className="form-control" id="date" name="date" placeholder="YYYY-MM-DD" type="text" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary " name="submit" type="submit" onClick={this.viewDate}>View Date</button>
                                </div>
                            </form>
                            <div id="error-messages"></div>
                        </div>
                        <div className="row">
                            {this.state.eventsToView.map(event => (
                                <Event
                                    key={event._id}
                                    title={event.title}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                />
                            ))}
                            <div id="hidden-div"></div>
                        </div>
                    </div>
                </div>
                {/* <nav className="footer">
                    <ul class="d-flex justify-content-center">
                        <li>
                            <a href="https://github.com/jwkeegan/CalendarManager" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-github fa-3x"></i>
                            </a>
                        </li>
                    </ul>
                    <div class="dev-wrapper text-center">
                        <a class="developer" href="https://www.github.com/jwkeegan" target="_blank" rel="noopener noreferrer">
                            Joe Keegan
                        </a>
                    </div>
                </nav> */}
            </div >
        );
    }
}

export default onClickOutside(Dashboard);