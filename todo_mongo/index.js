//import dependencies 
import express from "express";
import bodyPerser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
const cors = require("cors");
const passport = require("passport");
const users = require("./server/route/api/user");


//importing routs 
import routes from "./server/route/todoRoute";

//set up dependencies
const app = express()
app.use(bodyPerser.json())
app.use(bodyPerser.urlencoded({extended: true}))
app.use(logger("div"))


//set up mongoose
mongoose.connect('mongodb://localhost/todo_mongo')
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log(`Error connecting to DB & ERROR : ${err}`)
    })

//set up port 
const PORT = 3050
app.use(cors())
// app.use(require('cors')());

//set up rout
app.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Welcome to MONGO TODO Project'
    })
})
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/config/password")(passport);
// Routes
app.use("/api/users", users);

app.use('/todo/', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})