import programmer from "./../../resources/images/programmer.jpg"
import client from "./../../resources/images/client.png"
import cashier from "./../../resources/images/cashier.jpg"
import worker from "./../../resources/images/worker.jpg"
import director from "./../../resources/images/director.png"
import moderator from "./../../resources/images/moderator.png"
import operator from "./../../resources/images/operator.jpg"

export const nameRole = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    switch (roleName) {
        case "SUPER_ADMIN" :
            return "Dasturchi ";

        case "ADMIN" :
            return "Boshliq ";

        case "ACCOUNTANT" :
            return "Hisobchi ";

        case "MODERATOR" :
            return "Dasturchi ";

        case "CASHIER" :
            return "G'aznachi ";

        case "SELLER" :
            return "Oyna sotuvchi ";

        case "OPERATOR" :
            return "Operator ";

        case "AC_SELLER" :
            return "Aksessuar sotuvchi ";

        case "CAR_SERVICE" :
            return "Mashina xizmati ";

        case "WORKER" :
            return "Ishchi ";

        case "USER" :
            return "Mijoz";

        default :
            return "Noaniq";
    }
}


export const nameRoleOnly = (roleName) => {
    switch (roleName) {
        case "SUPER_ADMIN" :
            return "Dasturchi ";

        case "ADMIN" :
            return "Boshliq ";

        case "ACCOUNTANT" :
            return "Hisobchi ";

        case "MODERATOR" :
            return "Dasturchi ";

        case "CASHIER" :
            return "G'aznachi ";

        case "SELLER" :
            return "Oyna sotuvchi ";

        case "OPERATOR" :
            return "Operator ";

        case "AC_SELLER" :
            return "Aksessuar sotuvchi ";

        case "CAR_SERVICE" :
            return "Mashina xizmati ";

        case "WORKER" :
            return "Ishchi ";

        case "USER" :
            return "Mijoz ";

        default :
            return "Noaniq";
    }
}

export const imageRole = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    switch (roleName) {
        case "SUPER_ADMIN" :
            return programmer;

        case "ADMIN" :
            return director;

        case "ACCOUNTANT" :
            return moderator;

        case "CASHIER" :
            return cashier;

        case "SELLER" :
            return moderator;

        case "OPERATOR" :
            return operator;

        case "AC_SELLER" :
            return moderator;

        case "CAR_SERVICE" :
            return moderator;

        case "WORKER" :
            return worker;

        case "CLIENT" :
            return client;

        default :
            return null;
    }
}


export const routeRole = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    switch (roleName) {
        case "SUPER_ADMIN" :
            return "admin";

        case "ADMIN" :
            return "admin";

        case "ACCOUNTANT" :
            return "accountant";

        case "CASHIER" :
            return "cashier";

        case "SELLER" :
            return "seller";

        case "OPERATOR" :
            return "operator";

        case "AC_SELLER" :
            return "ac-seller";

        case "CAR_SERVICE" :
            return "car-service";

        case "WORKER" :
            return "worker";

        case "CLIENT" :
            return "client";

        default :
            return null;
    }
}

export const orderS = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "SUPER_ADMIN") {
        return true;
    }
}

export const orderSA = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "SUPER_ADMIN" || roleName === "ADMIN") {
        return true;
    }
}
export const orderAccountant = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "ACCOUNTANT") {
        return true;
    }
}
export const orderCashier = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "CASHIER") {
        return true;
    }
}
export const orderSeller = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "SELLER") {
        return true;
    }
}
export const orderOperator = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "OPERATOR") {
        return true;
    }
}
export const orderAccessorySeller = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "AC_SELLER") {
        return true;
    }
}
export const orderCarService = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "CAR_SERVICE") {
        return true;
    }
}
export const orderWorker = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "WORKER") {
        return true;
    }
}
export const orderClient = (currentUser) => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "CLIENT") {
        return true;
    }
}



export const nameOperation = (name) => {
    switch (name) {
        case "income" :
            return "Oyna olish";

        case "shipment" :
            return "Oyna sotish";

        case "order-affair" :
            return "Xizmat ko'rsatish";

        default :
            return null;
    }
}