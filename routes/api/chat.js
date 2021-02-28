const router = require("express").Router();
const passport = require("passport");
const { getAllInfoForChat } = require("./../../controllers/chat");


// @POST
// PRIVATE ROUTE
// Desc api/signup
router.get("/get-chat",passport.authenticate("jwt",{session: false}),getAllInfoForChat);

module.exports = router