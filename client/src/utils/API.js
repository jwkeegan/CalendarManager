import axios from "axios";

export default {
  // Gets all Users
  getUsers: function() {
    return axios.get("/api/users/");
  },
  // Creates a new User
  createUser: function(userData) {
    return axios.post("/api/users/", userData);
  },
  // Gets a user by email
  getUser: function(email) {
    return axios.get("/api/users/" + email);
  },
  // Deletes the user with the given email
  deleteUser: function(email) {
    return axios.delete("/api/users/" + email);
  },
  // Updates a user in the database
  updateUser: function(email, userData) {
    return axios.put("/api/users/" + email, userData);
  }
};
