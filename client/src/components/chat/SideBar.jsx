import React, { useState} from 'react';
import { connect } from 'react-redux';
import { Menu , Input,Button,Spin} from 'antd';
import Submenu from './Submenu';
import {createChannel} from './action';
import {
  DesktopOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

export const SideBar =(props)=> {

    const [show, setshow] = useState(false);
    const [channelName,setChannelName] = useState('');
    const {loading,data} = props.sideBarState;
    const {setCurrentChannel,socket,user} = props;

    const createChannel = (value)=>{
       if(value){
           props.createChannel(value,localStorage.getItem("token"));
           setChannelName('');
           setshow(false)
       }
    }

        return (
            <div>
                {!loading ? <Menu theme="dark" mode="inline">
                    {  
                      !!user && !!data && data.channels.map((channel,index)=>
                      <Submenu 
                        channel={channel} 
                        key={"channel"+ index} 
                        setCurrentChannel={setCurrentChannel}
                        socket={socket}
                        userInfo={user}
                      />) 
                    }
                    <Menu.Item 
                       key="9"
                       style={{background:!show ? 'transparent': ""}}
                       icon={show ? <MinusCircleOutlined/>:<PlusCircleOutlined />} 
                       onClick={()=>setshow(!show)}
                       >
                        New Channel
                    </Menu.Item>
                    {show && <Menu.Item style={{background:'transparent'}}>
                        <Input placeholder="channel name" value={channelName} onChange={(e)=> setChannelName(e.target.value)} />
                    </Menu.Item>}
                    {show && <Menu.Item style={{display:'flex',justifyContent:'center',background:'transparent'}}>
                        <Button type="primary" onClick={()=> createChannel(channelName)}> create </Button>
                    </Menu.Item>}
                </Menu>: <Spin/>}
            </div>
        )
    }

const mapStateToProps = (state) => ({
    sideBarState: state.chatReducer,
    user: state.loginReducer.user.user
})
const mapDispatchToProps = (dispatch)=>({
    createChannel: (value,token)=>dispatch(createChannel(value,token)),
})
export default connect(mapStateToProps,mapDispatchToProps)(SideBar)


