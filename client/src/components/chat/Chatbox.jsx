import React, { useRef,useEffect } from 'react'

const parentDiv = {
   height: '70vh',
   margin: '0px 10px',
   overflow: 'scroll',
}

const rightChildStyle = {
    fontColor: 'grey',
    wordWrap: 'break-word',
    border: '1px solid green',
    borderRadius: '5px 20px',
    padding: '5px 20px',
    justifySelf: 'flex-end'
}

const leftChildStyle = {
    maxWidth: '300px',
    fontColor: 'grey',
    wordWrap: 'break-word',
    border: '1px solid green',
    borderRadius: '5px 20px',
    padding: '5px 20px',
    justifySelf: 'flex-start'
}

const notificationStyle = {
    fontColor: 'grey',
    wordWrap: 'break-word',
    border: '1px solid green',
    borderRadius: '5px 20px',
    padding: '5px 20px',
    justifySelf: 'center',
    textAlign: "center"
}

const parent = {
    width: '95%',
    marginBottom: '10px',
    margin: '5px auto 10px auto',
    padding: '10px',
    display: 'grid',
}

export const Chatbox = (props)=> {
    const msgBox = useRef();
    useEffect(() => {
        if(msgBox.current){
            msgBox.current.scrollTop = msgBox.current.scrollHeight
        }
    })
        const {id,chats} = props;
        return (
            <div style={parentDiv} ref={msgBox}>
                {!!chats && chats.length > 0 && chats.map((msg)=> <div style={parent}>
                    {msg.sender !== "BOT" ? <span style={msg.sender == id ? rightChildStyle: leftChildStyle }>
                        {msg.message}<br/>
                        <span style={{fontSize: '10px', padding: '0px', margin: '0px'}}>
                            {msg.sender == id ? "You  ": msg.sender == "BOT" ? "BOT": msg.senderName} {msg.time}
                        </span>
                    </span>
                    : <span style={notificationStyle }>
                        {msg.message}<br/>
                        <span style={{fontSize: '10px', padding: '0px', margin: '0px'}}>
                            {msg.sender == id ? "You  ": msg.sender == "BOT" ? "BOT": msg.senderName} {msg.time}
                        </span>
                    </span>
                    
                }
                </div>)
                }
            </div>
        )
    
}
export default Chatbox
