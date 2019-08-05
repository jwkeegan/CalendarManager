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
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a book to the database
  updateUser: function(id, userData) {
    return axios.put("/api/books/" + id, userData);
  }
};
