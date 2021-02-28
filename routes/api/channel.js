const router = require("express").Router();
const passport = require("passport");
const { createChannel, deleteChannel,addToChannel } = require("./../../controllers/channel");

// @POST
// PRIVATE ROUTE
// Desc api/create-channel
router.get("/create-channel/:name",passport.authenticate('jwt', { session: false }), createChannel);

// @POST
// PRIVATE ROUTE
// Desc api/signin
router.delete("/remove-channel/:id",passport.authenticate('jwt', { session: false }), deleteChannel);

//POST
//PRIVATE ROUTE
//Desc api/add-members
router.get("/add-members/:channel_id",passport.authenticate('jwt', { session: false }),addToChannel)

module.exports = router