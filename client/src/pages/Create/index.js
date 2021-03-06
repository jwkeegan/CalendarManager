import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";
import Event from "../../components/Event";
import "./style.css";

class Create extends Component {
    state = {
        email: "",
        name: "",
        friends: [],
        events: [],
        eventsToView: [],
        friendsToView: []
    }

    handleClickOutside = () => {
        let curUserEmail = document.getElementById("user-name-holder").getAttribute("data-email");
        if (curUserEmail !== this.state.email && this.state.email !== "") {
            this.setState({
                email: "",
                name: "",
                friends: [],
                events: [],
                eventsToView: [],
                friendsToView: []
            });
        } else if (curUserEmail !== "") {
            this.loadProfile(curUserEmail)
        }
    }

    loadProfile = (email) => {
        API.getUser(email).then(res => {
            let friendsArray = this.sortFriends(res.data.friends);
            this.setState({
                email: res.data.email,
                name: res.data.name,
                friends: friendsArray,
                events: res.data.events
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

    viewDate = (event) => {
        event.preventDefault();
        let eventsToLoad = [];
        let dateToShow = document.getElementById("date").value;
        let eventArray = this.state.events;
        for (let event in eventArray) {
            if (eventArray[event].startTime.split("T")[0] === dateToShow) {
                eventsToLoad.push(eventArray[event]);
            }
        }
        this.setState({
            eventsToView: eventsToLoad
        });
    }

    addFriend = (event) => {
        event.preventDefault();
        let friendToAdd = document.getElementById("friend").value;
        let friendExists = false;
        let errorDiv = document.getElementById("error-message");
        let friendsToView = this.state.friendsToView;
        for (let friend in this.state.friends) {
            let curFriend = this.state.friends[friend];
            if (curFriend.username === friendToAdd) {
                friendExists = true;
                errorDiv.textContent = "";
                API.getUser(curFriend.email).then(res => {
                    let eventsToView = res.data.events.filter(event => {
                        if (document.getElementById("date").value === event.startTime.split("T")[0]) {
                            return event;
                        } else return false;
                    });
                    curFriend.events = eventsToView;
                    friendsToView.push(curFriend);
                }).then(() =>
                    this.setState({
                        friendsToView: friendsToView
                    })
                ).then(() => {
                    console.log(this.state.friendsToView);
                });
                break;
            }
        }

        if (!friendExists) {
            errorDiv.textContent = "User not found on friends list";
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row" id="create-tab-header">
                    <h2>Create New Event</h2>
                </div>
                <div className="row">
                    <div className="col event-form-box">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="date">Date</label>
                                <input className="form-control" id="date" name="date" placeholder="YYYY-MM-DD" type="text" />
                            </div>
                            <div className="form-group">
                                <button id="view-date" className="btn btn-primary " name="submit" type="submit" onClick={this.viewDate}>View Date</button>
                            </div>
                        </form>
                    </div>
                    <div className="col event-form-box">
                        <form>
                            <div className="form-group">
                                <label className="control-label" htmlFor="event-name">Event Name</label>
                                <input className="form-control" id="event-name" name="event-name" placeholder="" type="text" />
                            </div>
                        </form>
                    </div>
                    <div className="col event-form-box">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="start-time">Start Time</label>
                                <input className="form-control" id="start-time" name="start-time" placeholder="HH:MM" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="start-am-pm">AM/PM?</label>
                                <select className="form-control" id="start-am-pm">
                                    <option>am</option>
                                    <option>pm</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="col event-form-box">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="end-time">End Time</label>
                                <input className="form-control" id="end-time" name="end-time" placeholder="HH:MM" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="end-am-pm">AM/PM?</label>
                                <select className="form-control" id="end-am-pm">
                                    <option>am</option>
                                    <option>pm</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="col event-form-box">
                        {/* onClick={this.validateEvent} */}
                        <button className="btn btn-primary" id="add-event">Add Event</button>
                        <div id="event-error"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2" id="user-events">
                        <h4>Your Schedule</h4>
                        {this.state.eventsToView.length ?
                            (this.state.eventsToView.map(event => (
                                <Event
                                    key={event._id}
                                    title={event.title}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                />
                            ))) : (
                                <div>Nothing on the Schedule</div>
                            )
                        }

                    </div>

                    {this.state.friendsToView.map(friend => (
                        <div className="col-md-2 friend-events" key={friend._id}>
                            <h4 className="friend-data" data-email={friend.email}>{friend.username}</h4>
                            {friend.events.map(event => (
                                <Event
                                    key={event._id}
                                    title={event.title}
                                    startTime={event.startTime}
                                    endTime={event.endTime}
                                />
                            ))}
                        </div>
                    ))}

                    <div className="col-md-2" id="add-friend">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="friend">Add Friend to Compare</label>
                                <input className="form-control" id="friend" name="friend" placeholder="John Doe" type="text" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary " name="submit" type="submit" onClick={this.addFriend}>Compare Schedule</button>
                            </div>
                        </form>
                        <div id="error-message"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Create);