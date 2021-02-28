const Credential = require("./../models/Credential");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const myKey = require("./../config/MySecrect");

exports.signup = async (req, res) => {
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const { name, email, password } = req.body
    const prevUser = await Credential.findOne({ email })
    if (!!prevUser) {
        return res.status(403).json({
            error: "Email is allready registerd!"
        })
    }
    try {
        const creds = new Credential({ name, email, password });
        const user = await creds.save()
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        }
        jwt.sign(payload, myKey.secret, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) return res.status(500).json({ error: "server error" })
            return res.status(200).json({ token })
        })
    } catch (error) {
        return res.status(500).json({
            error: " server error"
        })
    }
}

exports.signin = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const { email, password } = req.body;
    const prevUser = await Credential.findOne({ email })

    if (!prevUser) {
        return res.status(404).json({ error: "Email not registerd " })
    }

    try {
        const authenticUser = prevUser.authenticate(password);

        if (authenticUser) {

            const payload = {
                id: prevUser._id,
                email: prevUser.email,
                name: prevUser.name
            }

            jwt.sign(payload, myKey.secret, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) return res.status(500).json({ error: "server error" })
                res.status(200).json({ token })
            })
        } else {
            return res.status(403).json({ error: "Invalid credentials !" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong " })
    }
}

