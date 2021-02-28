const Channel = require("./../models/Channel");
const Credentials = require("./../models/Credential");

exports.getAllInfoForChat = async (req,res)=>{

    try {
        const info = await Credentials.findById(req.user.id).populate([
            { path: "channels", select: "channelName", populate: { path: "members",select: "name", model: "SM_Credential" } },
            { path: "myChannels",select: "channelName", populate: { path: "members",select: "name", model: "SM_Credential" } }
        ])
        info.encryPassword = undefined;
        info.salt = undefined;
        return res.json(info);
    } catch (error) {
        console.log(err)
        return res.status(500).json({error: "Something went wrong could not fetch data !"})
    }
}

