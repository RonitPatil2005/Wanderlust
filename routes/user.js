const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")
const controllersUsers = require("../controllers/users.js");


router
 .route("/signup")
 .get(controllersUsers.renderSignupForm)
 .post(wrapAsync (controllersUsers.signUp) );

router
 .route("/login")
 .get(controllersUsers.renderLoginForm)
 .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), controllersUsers.login);

router.get("/logout", controllersUsers.logout);

module.exports = router;