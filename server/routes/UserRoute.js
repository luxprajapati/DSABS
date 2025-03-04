// Import the required modules
const express = require("express");
const router = express.Router();


// Import the required controller
const {
    login,
    signup,
    sendotp
}= require("../controllers/Auth");


// Import the required middleware
// const {auth} = require("../middlewares/auth");

// ===================================Authentication ROUTES==============================================
router.post("/login", login);

router.post("/signup", signup);

router.post("/sendotp", sendotp);

module.exports = router;