import React  from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Form, Input, Button,Row,Col,Typography} from 'antd';
import {connect} from 'react-redux';
import {signupUser,checkAuthentication} from './action';

class Signup extends React.Component {

  componentDidMount = ()=>{
    const token = localStorage.getItem("token");
    if(this.props.isUserLoggedIn){
      this.props.history.push("/chat")
    }else if(token){
      this.props.verifyToken(token)
    }
  }

  componentDidUpdate = ()=>{
    if(this.props.isUserLoggedIn){
      this.props.history.push("/chat")
    }
  }

  onFinish = (values) => {
    this.props.signup(values)

  };

  render() {
    return (
        
         <Row style={{marginTop: "30px"}}>
                <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
                <Typography.Title level={2} type="secondary" style={{textAlign:"center"}}>Chat app</Typography.Title>
                <Form  onFinish={this.onFinish} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Username"
                        rules={[
                        {   
                            required: true,
                        },
                        ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                        {   
                            required: true,
                            type: "email"
                        },
                        ]}
                    >
                    <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {   
                            required: true,
                        },
                        ]}
                    >
                    <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm-password"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                    },
                }),
                ]}
                    >
                    <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            sign up
                        </Button>
                        <span>Allready having account ? <Link to="/login" >sign in</Link></span>
                    </Form.Item>
            </Form>
                </Col>
            </Row>)
  }
}

const mapStateTProps = (state)=>({
    isUserLoggedIn: state.loginReducer.loggedInUser,
    loading: state.loginReducer.loading
})
const mapDispatchToProps = (dispatch)=>({
    signup: (value)=> dispatch(signupUser(value)),
    verifyToken: (token)=> dispatch(checkAuthentication(token))
})
export default connect(mapStateTProps,mapDispatchToProps)(withRouter(Signup))