const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
    channelName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    },
    members:[{ type: Schema.Types.ObjectId, ref: 'SM_Credential' }]
})
module.exports  = mongoose.model("SM_Channel", ChannelSchema)