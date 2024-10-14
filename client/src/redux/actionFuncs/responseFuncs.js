import {toast} from "react-toastify";
import loadingFalse from "../../utils/loadingFalse";
import {Redirect} from "react-router-dom"
import history from "../../utils/history";

export const sendThen = (fun,res) => (dispatch) => {
    if (res.statusCode === 200){
        toast.error(res.payload.message)
    }else {
        if (fun !== null && fun !== "OK"){
            dispatch(fun)
        }
        dispatch({
            type: "updateState",
            payload: {
                currentObject : null,
                openModal: false,
                deleteModal:false,
                currentItem:null
            }
        })
        if (res && res.payload && res.payload.message){
            toast.success(res.payload.message);
        }else {
            toast.success("Deleted");
        }
    }
}

export const sendCatch = () => (dispatch) => {
    dispatch(loadingFalse())
    toast.error("Catch Error!");
}