const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
// const aws = require("aws-sdk");
// require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// let s3;

// if (process.env.NODE_ENV === "production") {
//   s3 = new aws.S3({
//     API_KEY: process.env.API_KEY
//   });  
// }

// Define API routes here
app.use(routes);

// // API_KEY route
// app.get("/api/key/", (req, res) => {
//   if (process.env.NODE_ENV === "production") res.json(s3.API_KEY);
//   else return res.json(process.env.API_KEY);
// });


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/calendarusers");

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
