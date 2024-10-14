import {toast} from "react-toastify";

export const changeState = (state, element, val) => {
    state[element] = val
}

export const changeStateForm = (state, element, val) => {
    state['customForm'][element] = val
}
export const changeStateArray = (state, element, val) => {
    state.customForm[element].array = val

}

export const checkSelect = (payload,element,object) => {
    if (payload[`${element}Id`] === 0 || payload[`${element}Id`] === "") {
        if (object && object[element] && object[element]['id'])
        {
            payload[`${element}Id`] = object[element]['id']
            return true;
        }else {
            toast.error("Ma'lumot to'liq kiritilishi kerak")
            return false;
        }
    }else {
        return true;
    }
}

export const checkAttachment = (attachmentId, payload,object) => {
    if (payload.attachmentId === "") {
        if (attachmentId === "" || attachmentId === null) {
            if (object === "" || object === null) {
                toast.error("Ma'lumot to'liq kiritilishi kerak")
                return false;
            } else {
                payload.attachmentId = object && object.attachment && object.attachment.id ? object.attachment.id :''
                return true;
            }
        }
        payload.attachmentId = attachmentId
        return true;
    }else {
        return true;
    }
}
