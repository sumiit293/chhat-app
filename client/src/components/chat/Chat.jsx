import React from 'react';
import {connect} from 'react-redux';
import {createMessage} from './../../Factory';
import {SEND_MESSAGE,MESSAGE_RECIEVE,JOINED_FOR_FIRST_TIME,LEAVE_ROOM} from './../../Events';
import  SideBar  from './SideBar';
import {logout} from './../login/action';
import io from 'socket.io-client';
import { Chatbox } from './Chatbox';
import { withRouter } from 'react-router-dom';
import {updateChat} from './chat-store/action';
import { Layout, Row ,Input ,Col} from 'antd';
import {fetchChatData,addUserToChannel} from './action';
import {SendOutlined,LogoutOutlined} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;

const nStyle = {
      background: "rgba(5, 1, 0, 0.85)",
      color: 'white',
      fontWeight: '600',
      fontSize: '14px',
      padding: '5px',
      textAlign:'center'
  }

class Chat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentInputValue: null,
      collapsed: false,
      socket: null,
      currentChannel:null
    }
  }

  componentDidMount = ()=>{

    // initializing the socket
    const socket = io();

    //looking if the url have serach params
    const query = new URLSearchParams(this.props.location.search);
    const channelId = query.get("channel_id");
    if(channelId){
      this.props.addMembers(channelId,localStorage.getItem("token")).then(()=>{
        const {user} = this.props;
        if(user){
          const info = createMessage(`${user.name} Joined the channel`,"BOT",channelId,user.name)
          socket.emit(JOINED_FOR_FIRST_TIME,info);
          this.props.history.push("/chat");
          this.props.fetchChatData(localStorage.getItem("token"))
        }
      })
    }else{
      this.props.fetchChatData(localStorage.getItem("token"))
    }
    

    this.setState({socket},()=>{
    //saving the msg to local state when msg is received 
    const {socket} = this.state;
      socket.on(MESSAGE_RECIEVE,(msg)=>{
      this.props.setChatState(msg.channel_id,msg)
      });
    });
  }
  //when unmounting 
  beforeLogout =  async ()=> {
    const {socket} = this.state;
    const {chats} = this.props;
    const listOfAllChannels = !!chats.data ? chats.data.channels.map((channel)=>channel._id): []
    const id = !!chats.data  ? chats.data._id: ''
    socket.emit(LEAVE_ROOM,{_id: id,room: listOfAllChannels});
  }

  // for cillapsing the sidebar
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  // for loging out the user
  logoutUser = async ()=>{
    await this.beforeLogout()
    this.props.logoutUser()
  }

  //set the current channel
  setCurrentChannel = (value)=>{
    this.setState({currentChannel: value})
  }

  // handle the emit msg to server
  handleMsg = ()=>{
    const {currentInputValue,currentChannel,socket} = this.state;
    const {user} = this.props;
    if(!!currentInputValue && !!currentChannel){
      //creating the msg 
      const msg = createMessage(currentInputValue,user.id,currentChannel._id,user.name)
      this.props.setChatState(currentChannel._id,msg)
      //emitting to server
      !!socket && socket.emit(SEND_MESSAGE,msg);
      this.setState({currentInputValue: ''})
    }
  }

  render() {
    const { collapsed ,currentChannel,currentInputValue} = this.state;
    const {user,chats} = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <SideBar 
          setCurrentChannel={this.setCurrentChannel} 
          socket={this.state.socket}
          channelId = {!!currentChannel ? currentChannel._id : null}
        />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            <Row className="site-layout-background">
                {!!currentChannel && <Col span={22}>
                    <p style={{fontSize: '20px',fontWeight: '600',margin: '0px',color:'white'}}>
                      {currentChannel.channelName}
                    </p>
                </Col>}
                <Col span={2}><LogoutOutlined style={{fontSize: '20px',fontWeight: '600',cursor: 'pointer',color:'white'}} onClick={this.logoutUser}/></Col>
            </Row>
          </Header>
          <Content style={{ margin: '0px'}}>
            {!!currentChannel && <p style={nStyle}>{`http://localhost:4000/chat?channel_id=${currentChannel._id}`}</p>}
            {!!currentChannel && !!user &&
            <Chatbox 
              channelId={currentChannel._id} 
              chats={chats[currentChannel._id]}
              id={user.id}
            />}
          </Content>
          {!!currentChannel && <Footer>
            <Input 
              placeholder="Enter your msg" 
              addonAfter={ 
                  <SendOutlined 
                    style={{cursor: 'pointer',color:"blue"}}
                     size="middle"
                     onClick={this.handleMsg}
                />
                }
              value={currentInputValue}
              onChange={(e)=> this.setState({currentInputValue: e.target.value})}
              onPressEnter = {this.handleMsg}
            />
          </Footer>}
        </Layout>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch)=>({
  logoutUser: (value)=> dispatch(logout(value)),
  fetchChatData: (token)=> dispatch(fetchChatData(token)),
  addMembers: (value,token)=>dispatch(addUserToChannel(value,token)),
  setChatState: (key,value)=> dispatch(updateChat(key,value))
})

const mapStateToProps = (state)=>({
  user: state.loginReducer.user.user,
  chats: state.chatStateSReducer

})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Chat))