var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Credentials = require("./../models/Credential");
const myKey = require("./../config/MySecrect");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = myKey.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Credentials.findById(jwt_payload.id)
            .then(
                cred => {
                    if (cred) {
                        const rest = {
                            name: cred.name,
                            id: cred._id,
                            email: cred.email
                        }
                        return done(null, rest);
                    }
                    return done(null, false);
                }
            )
            .catch(err => console.log(err))
    }))
}
