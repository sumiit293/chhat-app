import React , {useEffect} from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Form, Input, Button,Row,Col,Typography} from 'antd';
import {connect} from 'react-redux'
import {loginUser,checkAuthentication} from './action';

export const Login = (props)=> {

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(props.isUserLoggedIn){
      props.history.push("/chat")
    }else if(token){
      props.verifyToken(token)
    }
    //eslint-disable-next-line
  },[props.isUserLoggedIn])

  const onFinish = (values) => {
    props.signin(values)

  };
  return (
  <Row style={{marginTop: "30px"}}>
        <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
        <Typography.Title level={2} type="secondary" style={{textAlign:"center"}}>Chat app</Typography.Title>
          <Form  onFinish={onFinish} layout="vertical">
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
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
                <span>Not having account ? <Link to="/signup" >sign up</Link></span>
            </Form.Item>
      </Form>
          </Col>
    </Row>
    );
}

const mapStateToProps = (state)=>({
  isUserLoggedIn: state.loginReducer.loggedInUser,
  loading: state.loginReducer.loading
})

const mapDispatchToProps = (dispatch)=>({
  signin: (value)=> dispatch(loginUser(value)),
  verifyToken: (token)=> dispatch(checkAuthentication(token))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))