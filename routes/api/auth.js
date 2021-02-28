const router = require("express").Router();
const { check } = require("express-validator");
const { signup, signin } = require("./../../controllers/auth");


// @POST
// PRIVATE ROUTE
// Desc api/signup
router.post("/signup", [
    check("name", "name should be atleat 3 char long").isLength({ min: 3 }),
    check("email", "Must be valid email").isEmail(),
    check("password", "Password must be atleast 5 char long").isLength({ min: 5 })
], signup);

// @POST
// PRIVATE ROUTE
// Desc api/signin
router.post("/signin", [
    check("email", "Email field is required").isEmail(),
    check("password", "Password must be atleast 5 char long").isLength({ min: 5 })
], signin);

module.exports = router