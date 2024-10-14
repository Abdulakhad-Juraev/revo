import {v4 as uuidv4} from "uuid";
import {
    getDashboardFilterAction,
    getListAction,
    getListFilterAction,
    getListSearchAction,
    getOperationFilterAction
} from "./mainActions";
import {toast} from "react-toastify";

export const clearInputsAction = () => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            inputs: []
        }
    })
}

export const AEDInputAction = (array) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            inputs: array
        }
    })
}

export const addInputAction = (array) => {
    array.push({id : uuidv4()})
    return array;
}

export const editInputAction = (array,value,index) => {
    let newArray = []
}

export const deleteInputAction = () => {

}



export const searchListFun = (e,name) => (dispatch) =>{
    if (e.target.value !== "") {
        dispatch(getListSearchAction({name : name, searchValue : e.target.value}))
    }else {
        dispatch(getListAction({name: name}))
    }
}


export const getListFilterFun = (e,v,name) => (dispatch) =>{
    if (v.startDate !== "" && v.endDate !== ""){
        dispatch(getListFilterAction({name : name, payload : v}))
    }else {
        toast.error("Sanalar to'liq kiritilmagan")
    }
}

export const getDashboardFilter = (name,v = null) => (dispatch) =>{
    if (v === null){
        v = {startDate: null,endDate: null,date: false}
    }
    dispatch(getDashboardFilterAction({name : name, payload : v}))
}

export const getOperationFilter = (name,v = null) => (dispatch) =>{
    if (v === null){
        v = {startDate: null,endDate: null,date: false}
    }
    dispatch(getOperationFilterAction({name : name, payload : v}))
}

