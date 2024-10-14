import * as types from "../actionTypes/AppActionTypes";
import * as app from "../../api/AppApi";
import {toast} from "react-toastify";


// Attachment Action Start
export const uploadFileAction = (payload) => async (dispatch) => {
    if (!payload || !(payload.type.substring(0, payload.type.indexOf("/")) === "image")) {
        toast.error("File must be img")
        return "";
    }
    let obj = new FormData();
    obj.append("file", payload)

    dispatch({
        api: app.uploadFileAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: obj

    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: res.payload
            }
        })
    }).catch(err => err)
}

export const uploadMultiFileAction = (payload) => async (dispatch) => {
    if (!payload || !(payload.type.substring(0, payload.type.indexOf("/")) === "image")) {
        toast.error("File must be img")
        return "";
    }
    let obj = new FormData();
    obj.append("file", payload)

    dispatch({
        api: app.uploadFileAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ATTACHMENT_LIST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: obj
    })
}

export const deleteFileAction = (id,array) => async (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachments:array
        }
    })
}
// Attachment Action End

//
// export const getSocialEnumListAction = () => (dispatch) => {
//     dispatch({
//         api: app.getSocialEnumAppApi,
//         types: [
//             types.REQUEST_START,
//             types.REQUEST_SOCIAL_ENUM_SUCCESS,
//             types.REQUEST_ERROR
//         ]
//     })
// }



export const acceptAction = (payload) => async (dispatch) => {
    dispatch({
        api: app.acceptAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        toast.success(res.payload.message)
    }).catch(err => err)
}

