import * as types from "../actionTypes/AuthActionTypes";
import {
    loginUserAuthApi,
    registerAuthApi,
    activeUserAuthApi, endRegisterAuthApi
} from "../../api/AuthApi.js";
import {TOKEN} from "../../utils/constants";
import {
    meAuthApi,
} from "../../api/AuthApi";
import {toast} from "react-toastify";
import jwt from "jwt-decode";

export const login = (payload) => async (dispatch) => {
    try {
        const res = await dispatch({
            api: loginUserAuthApi,
            types: [types.REQUEST_AUTH_START, "", types.REQUEST_API_ERROR],
            data: payload.v,
        });
        if (res.success) {
            let parsedToken = jwt(res.payload.object.token);
            setTimeout(() => {
                setStateRole(parsedToken.role, dispatch);
                pushHisPage(parsedToken.role, payload.history);
            }, 1000);
            localStorage.setItem(
                TOKEN,
                res.payload.object.tokenType + " " + res.payload.object.token
            );
        }
        return true;
    } catch (err) {
        if (err.response) toast.error(err.response.data.message);
        return false;
    }
};

export const registerAction = (payload) => (dispatch) => {
    dispatch({
        api: registerAuthApi,
        types: [
            types.REQUEST_AUTH_START,
            types.REGISTER_USER,
            types.REQUEST_AUTH_ERROR
        ],
        data: payload.v
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                userMail: payload.v.email
            }
        })
        pushPage(payload.history, "/verify")
    }).catch(err => {
        toast.error("Something went wrong!");
    })
};

export const endRegisterAction = (payload) => (dispatch) => {
    dispatch({
        api: endRegisterAuthApi,
        types: [
            types.REQUEST_AUTH_START,
            types.REQUEST_AUTH_ERROR
        ],
        data: payload
    }).then(res => {
        let parsedToken = jwt(localStorage.getItem(TOKEN));
        setTimeout(() => {
            setStateRole(parsedToken.role, dispatch);
            pushHisPage(parsedToken.role, payload.history);
        }, 1000);
    }).catch(err => {
        toast.error("Something went wrong!");
    })
};

export const activateUser = (payload) => (dispatch) => {
    dispatch({
        api: activeUserAuthApi,
        types: [
            types.REQUEST_AUTH_START,
            types.REQUEST_AUTH_ERROR
        ],
        data: payload.token
    }).then(res => {
        let parsedToken = jwt(res.payload.object.token);
        setTimeout(() => {
            setStateRole(parsedToken.role, dispatch);
        }, 1000);
        localStorage.setItem(
            TOKEN,
            res.payload.object.tokenType + " " + res.payload.object.token
        );

        pushPage(payload.history, "/end-register")

    }).catch(err => {
        toast.error("Something went wrong!");
    })
};

export const logout = () => (dispatch) => {
    dispatch({
        type: types.AUTH_LOGOUT,
    });
};

export const userMe = (payload) => async (dispatch, getState) => {
    const {
        auth: {currentUser, sentUserMe},
    } = getState();
    if (sentUserMe || currentUser || !localStorage.getItem(TOKEN)) return;
    try {
        const response = await dispatch({
            api: meAuthApi,
            types: [
                types.AUTH_GET_CURRENT_USER_REQUEST,
                types.AUTH_GET_USER_TOKEN_SUCCESS,
                types.AUTH_GET_CURRENT_USER_ERROR,
            ],
        });
        console.log(response)
        if (response.success) {
            dispatch({
                type: "updateState",
                payload: {
                    permissions: response.payload.permissions,
                },
            });
            if (payload) {
                dispatch({
                    type: "updateStateOrder",
                    payload: {currentUser: response.payload},
                });
            }
            dispatch({
                type: types.AUTH_GET_USER_TOKEN_SUCCESS,
                payload: response.payload,
            });
            setStateRole(response.payload.role, dispatch);
        } else {
            dispatch({
                type: types.AUTH_LOGOUT,
            });
        }
    } catch (e) {
        dispatch({
            type: types.AUTH_LOGOUT,
        });
    }
};

const setStateRole = (role, dispatch) => {
    let roleStatus = ""
    role = {roleName : "ADMIN"}
    switch (role.roleName) {
        case "ADMIN" :
            dispatch({type: "updateState",
                payload: {
                    isSuperAdmin: true,
                    isAdmin: true,
                },
            });
            roleStatus = 'superAdmin'
            break;

        case "ADMIN" :
            dispatch({type: "updateState", payload: {isAdmin: true}});
            roleStatus = 'admin'
            break;

        case "ACCOUNTANT" :
            dispatch({type: "updateState", payload: {isAccountant: true}});
            roleStatus = 'accountant'
            break;

        case "CASHIER" :
            dispatch({type: "updateState", payload: {isCashier: true}});
            roleStatus = 'cashier'
            break;

        case "SELLER" :
            dispatch({type: "updateState", payload: {isSeller: true}});
            roleStatus = 'seller'
            break;

        case "OPERATOR" :
            dispatch({type: "updateState", payload: {isOperator: true}});
            roleStatus = 'operator'
            break;

        case "AC_SELLER" :
            dispatch({type: "updateState", payload: {isAccessorySeller: true}});
            roleStatus = 'ac-seller'
            break;

        case "CAR_SERVICE" :
            dispatch({type: "updateState", payload: {isCarService: true}});
            roleStatus = 'car-service'
            break;

        case "WORKER" :
            dispatch({type: "updateState", payload: {isWorker: true}});
            roleStatus = 'worker'
            break;

        case "CLIENT" :
            dispatch({type: "updateState", payload: {isUser: true}});
            roleStatus = 'client'
            break;
    }
    localStorage.setItem('role', roleStatus);
};

const pushHisPage = (role, history) => {
    const {push} = history;
    role = {roleName : "ADMIN"}
        switch (role.roleName) {
            case "ADMIN" :
                push("/admin/home");
                break;
            case "ACCOUNTANT" :
                push("/accountant/home");
                break;
            case "CASHIER" :
                push("/cashier/home");
                break;
            case "SELLER" :
                push("/seller/home");
                break;
            case "OPERATOR" :
                push("/operator/home");
                break;
            case "AC_SELLER" :
                push("/ac-seller/home");
                break;
            case "CAR_SERVICE" :
                push("/car-service/home");
                break;
            case "WORKER" :
                push("/worker/home");
                break;
            case "CLIENT" :
                push("/client/home");
                break;
            default :
                logout()
        }
};

const pushPage = (history, link) => {
    const {push} = history;
    push(link);
}

