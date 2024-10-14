import * as types from "../actionTypes/AppActionTypes";
import {sendCatch, sendThen} from "./responseFuncs";
import {changeStateArray} from "../../utils/SecondaryFuncs/SecondaryFuncs";
import {
    deleteAppApi,
    editAppApi, getDashboardFilterAppApi,
    getListAppApi, getListAppApiOrdered,
    getListByItemAppApi, getListFilterAppApi, getListSearchAppApi,
    getOneAppApi, getOperationFilterAppApi, patchAppApi, payAppApi,
    saveAppApi
} from "../../api/CustomAPI/SimpleAPI";
import {makeUpperCase} from "../../utils/CustomUtils/makeUppercase";

export const simpleAction = (payload, api, reload = true, list = true) => (dispatch) => {
    dispatch({
        api: chooseAPI(api.type),
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: {api: api.cAPI, payload: payload}
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: null,
                openModal : false
            }
        })
        if (list){
            dispatch(sendThen(getListAction({name : api.cAPI}), res))
        }else if (list === false){
            dispatch(sendThen("OK",res))

            if (reload){
                window.location.reload(false)
            }
        }
    }).catch(() => {
        dispatch(sendCatch())
    })
}

export const simplePayAction = (payload, api, list = true) => (dispatch) => {
    dispatch({
        api: payAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: {api: api.cAPI, payload: payload}
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: null
            }
        })
        if (list){
            dispatch(sendThen(getListAction({name : api.cAPI}), res))
        }else {
            dispatch(sendThen(null,res))
        }
    }).catch(() => {
        dispatch(sendCatch())
    })
}

export const getListActionOrdered = (payload) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getListAppApiOrdered,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}

export const getListAction = (payload) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getListAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}

export const getListSearchAction = (payload) => (dispatch) => {
    dispatch({
        api: getListSearchAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SEARCH_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}


export const getListFilterAction = (payload) => (dispatch) => {
    dispatch({
        api: getListFilterAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SEARCH_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}



export const getDashboardFilterAction = (payload) => (dispatch) => {
    dispatch({
        api: getDashboardFilterAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}

export const getOperationFilterAction = (payload) => (dispatch) => {
    dispatch({
        api: getOperationFilterAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_OPERATION_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}


export const getListByAction = (payload) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getListByItemAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload.name)}_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        console.log(res)
    })
}


export const getOneAction = (data) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getOneAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(data.api)}_ONE_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: data
    })
}

export const getItemListByItemAction = (payload, api, type, state, secondElement) => (dispatch) => {
    dispatch({
        api: api,
        types: [
            types.REQUEST_START,
            types[type],
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        changeStateArray(state, secondElement, res.payload.object)
    }).catch(err => err)

}


const chooseAPI = (name) => {
    switch (name) {
        case "delete" :
            return deleteAppApi
        case "save" :
            return saveAppApi
        case "edit" :
            return editAppApi

        case "patch" :
            return patchAppApi

        default :
            break;
    }
}


