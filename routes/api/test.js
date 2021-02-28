const passport = require("passport");
const router = require("express").Router()

router.get("/test", passport.authenticate('jwt', { session: false }),(req, res) => {
    if(req.user){
        res.json({user: req.user})
    }else{
        res.status(403).json({error: "token expired"})
    }
})

module.exports = router