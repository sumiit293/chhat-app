import React,{useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {checkAuthentication} from './../login/action';

const PrivateRoute = ({ component: Component, isUserLoggedIn, loading, ...rest }) => {
    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <Route
            {...rest}
            render={props => !isUserLoggedIn && !loading ? <Redirect to="/login" /> : <Component {...props} />}
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