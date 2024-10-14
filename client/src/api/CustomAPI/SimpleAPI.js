import HttpClient from "../../utils/HttpClient";
import {api} from "../api";


export const getListAppApi = (data) => {
    return HttpClient.doGet(api[data.name] + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""));
}

export const getListAppApiOrdered = (data) => {
    return HttpClient.doGet(api[data.name]+"/ordered"+ (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""));
}



export const getListSearchAppApi = (data) => {
    return HttpClient.doGet(api[data.name] + "/search/" + (data.searchValue ?? '') + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""));
}



export const getListFilterAppApi = (data) => {
    return HttpClient.doPost(api[data.name] + "/byDate", data.payload);
}


export const getDashboardFilterAppApi = (data) => {
    return HttpClient.doPost(api[data.name], data.payload);
}

export const getOperationFilterAppApi = (data) => {
    return HttpClient.doPost(api[data.name], data.payload);
}


export const getOneAppApi = (data) => {
    return HttpClient.doGet(data && data.id ? `${api[data.api]}/${data.id}` : api[data.api]);
}

export const getListByItemAppApi = (data) => {
    return HttpClient.doGet(`${api[data.name]}/${data.id}` + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""));
}

export const getAppApi = (customApi) => {
    return HttpClient.doGet(api[customApi]);
}

export const payAppApi = (data) => {
    return HttpClient.doPost(api[data.api] + "/" + data.payload.id,data.payload);
}

export const saveAppApi = (data) => {
    return HttpClient.doPost(api[data.api],data.payload ?? "");
}
export const editAppApi = (data) => {
    return HttpClient.doPut(api[data.api] + "/" + data.payload.id,data.payload);
}

export const patchAppApi = (data) => {
    return HttpClient.doPatch(api[data.api] + "/" + data.payload,data.payload);
}
export const deleteAppApi = (data) => {
    return HttpClient.doDelete(api[data.api] + "/" + data.payload);
}