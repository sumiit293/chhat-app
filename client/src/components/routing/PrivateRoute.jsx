import React,{useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {checkAuthentication} from './../login/action';

const PrivateRoute = ({ component: Component, isUserLoggedIn, loading,checkAuth, ...rest }) => {
    useEffect(() => {
        checkAuth()
        //eslint-disable-next-line
    }, [])
    return (
        <Route
            {...rest}
            render={props => !localStorage.getItem("authenticated") && !loading ? <Redirect to="/login" /> : <Component {...props} />}
        />
    )
};
const mapStateToProps = (state) => ({
    isUserLoggedIn: state.loginReducer.loggedInUser,
    loading: state.loginReducer.isLoading
});
const mapDispatchToProps = (dispatch)=>({
    checkAuth: ()=> dispatch(checkAuthentication(localStorage.getItem("token")))
})
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
