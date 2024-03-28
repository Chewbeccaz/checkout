const express = require("express");
const { getUsers } = require("./users.controllers");
const { loggedIn } = require("../../middlewares/loggedIn");
const router = express.Router();

//Här skriver vi end pointsen

router.get("/", loggedIn, getUsers);

module.exports = router;
