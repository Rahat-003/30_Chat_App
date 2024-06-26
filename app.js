// #31 38:40
// check avatarUpload
// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

// internal imports
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");

const loginRouter = require("./router/loginRouter");

const app = express();
dotenv.config();

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("database connection successfull");
    })
    .catch((err) => {
        console.log(err);
    });

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App is running at port ${process.env.PORT}`);
});
