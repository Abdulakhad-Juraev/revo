import HttpClient from "../../utils/HttpClient";
import {api} from "../api";

export const getCountryListAppApi = () => {
    return HttpClient.doGet(api.country);
}
export const getCountryAppApi = () => {
    return HttpClient.doGet(api.country);
}
export const saveCountryAppApi = (data) => {
    return HttpClient.doPost(api.country,data);
}
export const editCountryAppApi = (data) => {
    return HttpClient.doPut(api.country + "/" + data.id,data);
}