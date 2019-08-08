// import React from "react";
// import onClickOutside from "react-onclickoutside";
// import API from "../../utils/API";

// let loadedEvents = [];

// const viewDate = (eventArray) => {
//     loadedEvents = [];
//     let dateToShow = document.getElementById("date").value;
//     for (let event in eventArray) {
//         console.log(eventArray[event].startTime.split("T")[0]);
//         if (eventArray[event].startTime.split("T")[0] === dateToShow) {
//             loadedEvents.push(eventArray[event]);
//         }
//     }
// }

// function RightPanel(props) {

//     // code under export goes here

//     return (
//         <div>
            
//         </div>
//     );
// }

// // export default onClickOutside(RightPanel);
// export default RightPanel;

// commented code below goes to start of component if I change RightPanel back to
// a component
//
//
// state = {
//     email: "",
//     name: "",
//     events: []
// };

// viewDate = (event) => {
//     event.preventDefault();
//     const curUser = document.getElementById("user-name-holder");
//     this.setState({
//         email: curUser.getAttribute("data-email"),
//         name: curUser.getAttribute("data-name")
//     });
//     if (this.state.name !== "") {
//         this.handleLogin();
//     }
// }

// handleLogin = () => {
//     let newUser = true;
//     let eventsArray = [];
//     let eventsToLoad = document.getElementById("hidden-div").getAttribute("data-to-store");
//     for (let i = 0; i < eventsToLoad; i++) {
//         let event = document.getElementById("event-" + i);
//         let eventObject = {
//             title: event.getAttribute("data-title"),
//             startTime: event.getAttribute("data-start-time"),
//             endTime: event.getAttribute("data-end-time")
//         };
//         eventsArray.push(eventObject);
//     }

//     API.getUsers().then((res) => {
//         for (var user in res.data) {
//             if (res.data[user].email === this.state.email) {
//                 newUser = false;
//                 break;
//             }
//         }

//         if (newUser) {
//             API.createUser({
//                 username: this.state.name,
//                 email: this.state.email,
//                 events: eventsArray
//             }).then(res => this.showUserEvents(res.data));
//         } else {
//             // console.log(eventsArray);
//             API.updateUser(this.state.email, {
//                 "$set": {
//                     events: eventsArray
//                 }
//             }).then(res => this.updateEvents(res.data.events));
//         }

//     });

// }

// updateEvents = (events) => {
//     let newEvents = [];
//     let dateToShow = document.getElementById("date").value;
//     // console.log(events);
//     const errorDiv = document.getElementById("error-messages");
//     // const eventsDiv = document.getElementById("events-div");
//     // eventsDiv.textContent = "";
//     if (dateToShow === "") {
//         errorDiv.textContent = "Enter Date";
//     }
//     else if (dateToShow.split("-").length !== 3 ||
//         dateToShow.split("-")[0].length !== 4 ||
//         dateToShow.split("-")[1].length !== 2 ||
//         dateToShow.split("-")[2].length !== 2) {
//         errorDiv.textContent = "Incorrect Date Format";
//     }
//     else {
//         errorDiv.textContent = "";
//         for (var event in events) {
//             let startTimeSplit = events[event].startTime.split("T");
//             if (startTimeSplit[0] === dateToShow) {
//                 // console.log("match found");
//                 newEvents.push(events[event]);
//             }
//         }
//     }

//     this.setState({
//         events: newEvents
//     });
// }
