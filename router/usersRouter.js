// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const { getUsers, addUser } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
    addUserValidationHandler,
    addUserValidators,
} = require("../middlewares/users/userValidators");

const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users "), getUsers);

// add user
router.post(
    "/",
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser,
);

module.exports = router;
