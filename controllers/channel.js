const Channel = require("./../models/Channel");
const Credentials = require("./../models/Credential");

exports.createChannel = (req,res)=>{
    console.log(req.user)
    const id = req.user.id
    // creating the channel
    const newChannel = new Channel({
        channelName: req.params.name,
        createdBy: id,
        members: [id]
    })

    //saving the Channel to db
    newChannel.save((err,docs)=>{
        console.log(err)
        if(err) return res.status(500).json({error: "Something went wrong"})

        // now putting the info to credential schema
        Credentials.findByIdAndUpdate(id,{$addToSet: {myChannels: docs._id,channels: docs._id}},(err,doc)=>{
            if(err) return res.status(500).json({error: "Something went wrong"})
            docs.populate({path: "members",select: "name"}).execPopulate().then((t)=>res.json(t))
        })
    })
}

exports.addToChannel = (req,res)=>{
    // extracting channel_id from param
    const {channel_id} = req.params
    // finding the channel
    Credentials.findByIdAndUpdate(req.user.id,{$addToSet: {channels: channel_id}},(err,docs)=>{
        if(err) return res.status(500).json({error: "something went wrong"})
        Channel.findByIdAndUpdate(channel_id,{$addToSet: {members: docs._id}},(err,doc)=>{
            if(err){
                // reset the credentials
                Credentials.findByIdAndUpdate(req.user.id,{$pull: {channels: channel_id}},(err,docs)=>{
                    if(err) return res.status(500).json({error: "something went wrong"})
                })
            }
            return doc.populate({path: "members",select: "name"}).execPopulate().then((t)=>res.json(t))
        })
    })
}

exports.deleteChannel = (req,res)=>{
    const {id} = req.params;
    Channel.findById(id,(err,docs)=>{
        
        if(err) return res.status(404).json("No such channels found !")
        if(req.user.id.toString() !== docs.createdBy.toString()) return res.status(401).json({error: "You are not authorized to perform this operations !"})
        Credentials.updateMany({_id: {$in: docs.members}},{$pull: {channels: id,myChannels: id}},(err,doc)=>{
            if(err) return res.status(500).json("Something went wrong !")
            Channel.findByIdAndDelete(id,(err,docs)=>{
                return res.json({info: "Delete successfully"})
            })
        })
    })
    
}