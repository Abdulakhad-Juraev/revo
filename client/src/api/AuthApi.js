import HttpClient from "../utils/HttpClient";
import {api} from './api'

export const loginUserAuthApi = (data = {username: null, password: null, newUser:false}) => {
    return HttpClient.doPost(api.login, data);
}

export const meAuthApi = (data = {username: null, password: null}) => {
    console.log(data);
    return HttpClient.doGet(api.userMe);
}
export const registerAuthApi = (data) => {
    return HttpClient.doPost(api.registerUser, data);
}
export const endRegisterAuthApi = (data) => {
    return HttpClient.doPost(api.finalRegisterUser, data);
}

export const activeUserAuthApi = (data) => {
    return HttpClient.doPost(api.activate + data);
}
