const router = require("express").Router();
const aws = require("aws-sdk");
require("dotenv").config();

let s3;

if (process.env.NODE_ENV === "production") {
    s3 = new aws.S3({
        API_KEY: process.env.API_KEY
    });
}

// API_KEY route
app.get("/api/key/", (req, res) => {
    if (process.env.NODE_ENV) res.send(s3.API_KEY);
    else return res.send(process.env.API_KEY);
});

