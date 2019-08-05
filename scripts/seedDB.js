const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/calendarusers"
);

const userSeed = [
  {
    username: "ex 1",
    email: "123@ex.com"
  },
  {
    username: "ex 2",
    email: "456@ex.com"
  },
  {
    username: "ex 3",
    email: "789@ex.com"
  },
  {
    username: "ex 4",
    email: "0854@ex.com"
  },
  {
    username: "ex 5",
    email: "985@ex.com"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
