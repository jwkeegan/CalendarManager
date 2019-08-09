import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import API from "../../utils/API";
import Event from "../../components/Event";

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
        console.log(curUserEmail);
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
            console.log(this.state.eventsToView);
            this.loadProfile(curUserEmail)
        }
    }

    loadProfile = (email) => {
        API.getUser(email).then(res => {
            console.log(res);
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
        console.log(dateToShow);
        let eventArray = this.state.events;
        for (let event in eventArray) {
            if (eventArray[event].startTime.split("T")[0] === dateToShow) {
                eventsToLoad.push(eventArray[event]);
            }
        }
        console.log(dateToShow);
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
        console.log(friendsToView);
        for (let friend in this.state.friends) {
            let curFriend = this.state.friends[friend];
            console.log(friendToAdd);
            console.log(curFriend);
            if (curFriend.username === friendToAdd) {
                friendExists = true;
                errorDiv.textContent = "";
                API.getUser(curFriend.email).then(res => {
                    curFriend.events = res.data.events;
                    friendsToView.push(curFriend);
                }).then(() =>
                    this.setState({
                        friendsToView: friendsToView
                    })
                );
                break;
            }
        }

        if (!friendExists) {
            errorDiv.textContent = "User not found on friends list";
        }
    }

    addEvent = () => {
        let eventErrorDiv = document.getElementById("event-error");
        // grab values from the form
        let eventDate = document.getElementById("date").value;
        let eventName = document.getElementById("event-name").value;
        let startTime = document.getElementById("start-time").value;
        let endTime = document.getElementById("end-time").value;
        // Check if formats of entries are correct, if not, give an error message
        let validDate = this.checkDateFormat(eventDate);
        if (!validDate) {
            eventErrorDiv.textContent = "Please enter date in format YYYY-MM-DD";
            return;
        }
        if (eventName === "") {
            eventErrorDiv.textContent = "Please enter a name for your event";
            return;
        }
        let validStart = this.checkTimeFormat(startTime);
        let validEnd = this.checkTimeFormat(endTime);
        if (!validStart || !validEnd) {
            eventErrorDiv.textContent = "Please enter times in format HH:MM";
            return;
        }
        let validEvent = this.checkTimeDifference(startTime, endTime);
        if (!validEvent) {
            eventErrorDiv.textContent = "Start time must be before End time";
            return;
        }
        eventErrorDiv.textContent = "Event '" + eventName + "' added!";
    }

    checkDateFormat = (date) => {
        // if no date entered
        if (date === "") return false;
        else {
            let dateSplit = date.split("-");
            // if first split is not YYYY
            if (dateSplit[0].length !== 4) return false;
            // if second split is not MM and from 1-12
            else if (dateSplit[1].length !== 2 || parseInt(dateSplit[1]) < 1 || parseInt(dateSplit[1]) > 12) return false;
            // if third split is not DD and from 1-31
            else if (dateSplit[2].length !== 2 || parseInt(dateSplit[2]) < 1 || parseInt(dateSplit[2]) > 31) return false;
            // if there aren't exactly 3 splits
            else if (dateSplit.length !== 3) return false;
            else return true;
        }
    }

    checkTimeFormat = (time) => {
        // if no time entered
        if (time === "") return false;
        else {
            let timeSplit = time.split(":");
            if (parseInt(timeSplit[0]) < 10 && timeSplit[0].length === 1) {
                // if HH is a number less than 10, but is entered as 1 digit (i.e. 9 instead of 09)
                // add the leading 0 for the user
                timeSplit[0] = "0" + timeSplit[0];
            }
            // if split is not 2 parts
            if (timeSplit.length !== 2) return false;
            // if first split is not HH or from 1-12
            if (timeSplit[0].length !== 2 || parseInt(timeSplit[0]) < 1 || parseInt(timeSplit[0]) > 12) return false;
            // if second split is not MM or from 00-59
            if (timeSplit[1].length !== 2 || parseInt(timeSplit[1]) < 0 || parseInt(timeSplit[1]) > 59) return false;
            else return true;
        }
    }

    checkTimeDifference = (start, end) => {
        let startAMPM = document.getElementById("start-am-pm").value;
        let endAMPM = document.getElementById("end-am-pm").value;
        let startHour = parseInt(start.split(":")[0]);
        let endHour = parseInt(end.split(":")[0]);
        // if either start hour is 12, change to 0 to compare correctly against 1 (i.e. 12:05 is before 1:05)
        if (startHour === 12) startHour = 0;
        if (endHour === 12) endHour = 0;
        let startMinute = parseInt(start.split(":")[1]);
        let endMinute = parseInt(end.split(":")[1]);
        if (startAMPM === "am" && endAMPM === "pm") return true;
        if (startAMPM === "pm" && endAMPM === "am") return false;
        if (startHour < endHour) return true;
        if (startHour > endHour) return false;
        if (startMinute < endMinute) return true;
        if (startMinute >= endMinute) return false;
        return false;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="date">Date</label>
                                <input className="form-control" id="date" name="date" placeholder="YYYY-MM-DD" type="text" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary " name="submit" type="submit" onClick={this.viewDate}>View Date</button>
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <form>
                            <div className="form-group">
                                <label className="control-label" htmlFor="event-name">Event Name</label>
                                <input className="form-control" id="event-name" name="event-name" placeholder="" type="text" />
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="start-time">Start Time</label>
                                <input className="form-control" id="start-time" name="start-time" placeholder="HH:MM" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="start-am-pm">am or pm</label>
                                <select className="form-control" id="start-am-pm">
                                    <option>am</option>
                                    <option>pm</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <form method="post">
                            <div className="form-group">
                                <label className="control-label" htmlFor="end-time">End Time</label>
                                <input className="form-control" id="end-time" name="end-time" placeholder="HH:MM" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="end-am-pm">am or pm</label>
                                <select className="form-control" id="end-am-pm">
                                    <option>am</option>
                                    <option>pm</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" id="add-event" onClick={this.addEvent}>Add Event</button>
                        <div id="event-error"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2" id="user-events">
                        {this.state.eventsToView.map(event => (
                            <Event
                                key={event._id}
                                title={event.title}
                                startTime={event.startTime}
                                endTime={event.endTime}
                            />
                        ))}
                    </div>

                    {this.state.friendsToView.map(friend => (
                        <div className="col-md-2 friend-events" key={friend._id}>
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
                        {(this.state.eventsToView.length) ? (
                            <form method="post">
                                <div className="form-group">
                                    <label className="control-label" htmlFor="friend">Add Friend to Compare</label>
                                    <input className="form-control" id="friend" name="friend" placeholder="John Doe" type="text" />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary " name="submit" type="submit" onClick={this.addFriend}>Compare Schedule</button>
                                </div>
                            </form>
                        ) : (
                                <div></div>
                            )}
                        <div id="error-message"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Create);