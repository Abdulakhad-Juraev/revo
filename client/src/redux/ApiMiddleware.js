import * as authActionTypes from "./actionTypes/AuthActionTypes";
import loadingFalse from "../utils/loadingFalse";

const apiMiddleware = ({dispatch}) => (next) => (action) => {
    let waitTime = 1500;
    if (!action.api) {
        return next(action);
    }
    const {api, types: [START, SUCCESS, ERROR], data} = action;

    dispatch({
        type: START
    });
    return api(data)
        .then((response) => {
            if (response || response.data || (response.data.success ||
                response.status === 201 || response.status === 204 || response.status === 200)) {
                dispatch({
                    type: SUCCESS,
                    payload: response.data
                });
                dispatch(loadingFalse())

                //then uchun add va editlarga...
                return {
                    payload: response.data,
                    data,
                    success: true,
                    statusCode: response.status
                }
            } else if (response.status === 401) {
                dispatch({
                    type: authActionTypes.AUTH_LOGOUT
                })
                dispatch(loadingFalse())
            } else {
                dispatch({
                    type: ERROR
                })
                dispatch(loadingFalse())
            }
        }).catch(error => {
            dispatch({
                type: ERROR
            })
            dispatch(loadingFalse())
            throw error;
        })

}


export default apiMiddleware