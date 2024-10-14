import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {userMe} from "../redux/actions/AuthActions";
import {TOKEN} from "./constants";


const PrivateRoute = ({dispatch, auth, path, history, location, component: Component, ...rest}) => {
    dispatch(userMe())


    const filterRole = (props) => {
        const role = localStorage.getItem('role');
        if( path.includes('/end-register')){
            return <Component {...props} />
        } else if (role === 'admin' || role === 'superAdmin') {
            if (path.includes('/admin')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        } else if (role === 'accountant') {
            if (path.includes('/accountant')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'cashier') {
            if (path.includes('/cashier')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'seller') {
            if (path.includes('/seller')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'operator') {
            if (path.includes('/operator')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'ac-seller') {
            if (path.includes('/ac-seller')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'car-service') {
            if (path.includes('/car-service')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }else if (role === 'worker') {
            if (path.includes('/worker')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        } else if (role === 'client') {
            if (path.includes('/client')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }
    }

    return (
        <Route
            path={path}
            {...rest}
            render={(props) =>
                localStorage.getItem(TOKEN) != null ? (
                    filterRole(props)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}
export default connect(({privateRoute, auth}) => ({privateRoute, auth}))(
    withRouter(PrivateRoute)
);
