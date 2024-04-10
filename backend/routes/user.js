const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
const { deleteUser } = require("../controller/deleteUser");

router.post("/createUser", createUser);
router.get("/getallUsers", getUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
