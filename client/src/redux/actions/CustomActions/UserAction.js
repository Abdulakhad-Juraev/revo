import * as types from "../../actionTypes/AppActionTypes";
import HttpClient from "../../../utils/HttpClient";

export const getUserSearchAction = (payload) => (dispatch) => {
    dispatch({
        api: getUserSearchAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_USERL_ONE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: payload
    })
}

export const getUserSearchAppApi = (data) => {
    return HttpClient.doGet( "/user/search-one/" + data);
}