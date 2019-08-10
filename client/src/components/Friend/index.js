import React from "react";
import API from "../../utils/API";
import "./style.css"

function Friend(props) {

    // const checkPending = (friendEmail, userEmail) => {
    //     let pending = false;
    //     API.getUser(friendEmail).then(res => {
    //         for (let friend in res.data.friends) {
    //             if (res.data.friends[friend].email === userEmail) {
    //                 console.log(res.data.friends[friend]);
    //                 if (res.data.friends[friend].pending) {
    //                     return true;
    //                 }
    //             }
    //         }
    //     }).then(() => {
    //         return pending;
    //     });
    // }

    // const confirmFriend = (friendEmail, userEmail) => {
    //     API.getUser(friendEmail).then(res => {
    //         let friendArray = res.data.friends;
    //         for (let friend in friendArray) {
    //             if (friendArray[friend].email === userEmail) {
    //                 friendArray[friend].pending = false;
    //             }
    //         }
    //         API.updateUser(friendEmail, {
    //             "$set": {
    //                 friends: friendArray
    //             }
    //         });
    //     });
    // }

    const deleteFriend = (friendEmail, userEmail) => {
        API.getUser(friendEmail).then(res => {
            let friendArray = res.data.friends;
            for (let friend in friendArray) {
                if (friendArray[friend].email === userEmail) {
                    friendArray.splice(friend, 1);
                }
            }
            API.updateUser(friendEmail, {
                "$set": {
                    friends: friendArray
                }
            });
        });

        API.getUser(userEmail).then(res => {
            let userFriendArray = res.data.friends;
            for (let friend in userFriendArray) {
                if (userFriendArray[friend].email === friendEmail) {
                    userFriendArray.splice(friend, 1);
                }
            }
            API.updateUser(userEmail, {
                "$set": {
                    friends: userFriendArray
                }
            });
        });
    }
    
    return (
        <div className="friend-display">
            <div className="friend">
                {props.friend}
                <button onClick={() => deleteFriend(props.email, props.userEmail)}>Delete</button>
            </div>
            {/* {checkPending(props.email, props.userEmail) ? (
                <button onClick={() => confirmFriend(props.email, props.userEmail)}>Confirm</button>
            ) : (<div></div>)} */}
            
        </div>
    )
}

export default Friend;
