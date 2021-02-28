const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto")
const { v4: uuidv4 } = require('uuid');


const CredentialSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    encryPassword: {
        type: String,
        required: true
    },
    myChannels: [{ type: Schema.Types.ObjectId, ref: 'SM_Channel' }],

    channels: [{ type: Schema.Types.ObjectId, ref: 'SM_Channel' }]
})

CredentialSchema.virtual("password")
    .set(function (password) {
        this.salt = uuidv4();
        this.encryPassword = this.securePassword(password)
    })

CredentialSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encryPassword;
    },
    securePassword: function (plainpassword) {
        if (!plainpassword) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (error) {
            return ""
        }
    }
}

module.exports = Credential = mongoose.model("SM_Credential", CredentialSchema)