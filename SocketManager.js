const io = require("./index");
const {
    JOIN_ROOM,
    JOINED_TO_ROOM,
    LEAVE_ROOM,
    SEND_MESSAGE,
    MESSAGE_RECIEVE,
    YOU_JOINED_THE_ROOM,
    JOINED_FOR_FIRST_TIME,
    NOTIFICATION_MSG
} = require('./Events');

var channels = {

}

module.exports = (socket)=>{

    //when user joied to room
    socket.on(JOIN_ROOM,(info)=>{
        socket.join(info.channel_id);
        socket.to(info.channel_id).emit(JOINED_TO_ROOM,info);
        channels = Object.assign({},channels,{[info.channel_id]: !!channels[info.channel_id]? [ ...channels[info.channel_id],info.id]:[info.id]})
        const initialInfo = {id:info.id,channel_id: info.channel_id,userInChannel: channels[info.channel_id]}
        socket.to(info.channel_id).emit(YOU_JOINED_THE_ROOM,initialInfo);
    })

    //when the user leave the room
    socket.on(LEAVE_ROOM,(info)=>{
        emitToMultipleRoom(socket,info.rooms,info._id);
    })

    //when msg is send
    socket.on(SEND_MESSAGE,(msg)=>{
        //emit to the right room
        socket.to(msg.channel_id).emit(MESSAGE_RECIEVE,msg);
    })

    //when joined for first time
    socket.on(JOINED_FOR_FIRST_TIME,(msg)=>{
        socket.to(msg.channel_id).emit(NOTIFICATION_MSG,msg)
    })

}

function emitToMultipleRoom(socket,rooms,info){
    for (room in rooms) {
        socket.to(room).emit(LEAVE_ROOM,info)
    }
}