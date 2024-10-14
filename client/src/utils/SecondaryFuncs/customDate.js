import moment from "moment";

export const getDateLLL = (date) => {
    return moment(date).format('DD-MM-YYYY, HH:mm')
}

export const getMonthLLL = (date) => {
    return moment(date).format('YYYY-MM')
}


export const getNumberLLL = (number) => {
    number = new Intl.NumberFormat().format(number)
    return number
    // return number.substr(0,number.indexOf('.') + 2)
}

export const getNameLLL = (name) => {
    switch (name) {
        case "income" :
            return "Oyna olish"
        case "shipment" :
            return "Oyna sotish"
        case "order_affair" :
            return "Xizmat ko'rsatish"
        case "car_affair" :
            return "Mashina xizmati"
        case "bank_affair" :
            return "Bank xizmati"
        case "order_salary" :
            return "Oylik maosh"
        case "order_accessory" :
            return "Akkessuar"
        case "expense" :
            return "Xarajat"
        case "car_service" :
            return "Mashina xizmati"
    }
}

