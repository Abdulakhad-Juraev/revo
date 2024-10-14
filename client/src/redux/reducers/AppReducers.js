import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";
import {
    changeReducerOne,
    changeReducerState, changeReducerStateDate,
    changeReducerStatePageable, changeReducerStateSimple,
    changeSelect, changeSelectSimple, changeSelectSimplePageable
} from "./reducerFuncs/reducerFuncs";


const initState = {
    attachmentUrl: 'http://localhost/api/attachment/',
    attachmentId: '',
    page: 1,
    size: 10,
    filterDate: '',
    totalElements: 0,
    totalPages: 0,
    attachments: [],
    loading: false,
    viewImage: '',
    viewImageModal: false,
    inputs: [],

    openModal: false,
    deleteModal: false,
    statusModal: false,

    currentItem: '',
    currentObject: {},

    userOne: {},


    companyByUser: {},

    socialEnumList: [],

    categoryList: [],
    brandList: [],
    templateList: [],
    templateIncomeList: [],
    templateShipmentList: [],
    shipmentListProducts: [],

    operationList: [],
    operationCount: 0,
    roleList: [],

    paymentList: [],
    payCashList: [],


    affairOne: {},
    incomeOne: {},
    shipmentOne: {},
    templateOne: {},
    accessoryIncomeOne: {},
    accessoryShipmentOne: {},
    orderAffairOne: {},
    userList: [],

    clientList: [],
    clientListSelect: [],
    workerList: [],
    workerListSelect: [],

    incomeList: [],
    shipmentList: [],
    expenseList: [],
    carList: [],
    carAffairList: [],
    affairList: [],
    affairListSelect: [],
    orderAffairList: [],
    bankList: [],
    bankAffairList: [],

    accessoryList: [],
    accessoryListSelect: [],
    accessoryIncomeList: [],
    accessoryShipmentList: [],

    salaryList: [],


    glassList: [],
    affairDashboardList: [],
    bankDashboardList: [],
    salaryDashboardList: [],
    accessoryDashboardList: [],
    carDashboardList: [],
    expenseDashboardList: [],
    payCashDashboardList: [],
    paymentDashboardList: [],
    districtsByRegion : [],

    operation: [],
    course: {},
    sectionList: [],
    regions: [],
    district: [],
    order: [],


    productList: [],
};

const reducers = {
    [types.REQUEST_START](state) {
        state.loading = true;
    },


    [types.REQUEST_GET_USER_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'userList', payload)
    },
    [types.REQUEST_GET_USERL_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, 'userOne', payload)
    },
    [types.REQUEST_GET_USER_DEBT_SUCCESS](state, payload) {
        console.log(payload)
        changeReducerStatePageable(state, 'userList', payload)
    },
    [types.REQUEST_GET_USER_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'userList', payload)
    },


    [types.REQUEST_GET_EXPENSE_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'expenseList', payload)
    },
    [types.REQUEST_GET_EXPENSE_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'expenseList', payload)
    },


    [types.REQUEST_GET_CAR_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'carList', payload)
    },
    [types.REQUEST_GET_CAR_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'carList', payload)
    },
    [types.REQUEST_GET_CAR_AFFAIR_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'carAffairList', payload)
    },
    [types.REQUEST_GET_CAR_AFFAIR_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'carAffairList', payload)
    },


    [types.REQUEST_GET_GLASS_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'glassList', payload)
    },
    [types.REQUEST_GET_AFFAIR_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'affairDashboardList', payload)
    },
    [types.REQUEST_GET_BANK_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'bankDashboardList', payload)
    },
    [types.REQUEST_GET_SALARY_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'salaryDashboardList', payload)
    },
    [types.REQUEST_GET_ACCESSORY_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'accessoryDashboardList', payload)
    },
    [types.REQUEST_GET_CAR_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'carDashboardList', payload)
    },
    [types.REQUEST_GET_EXPENSE_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'expenseDashboardList', payload)
    },
    [types.REQUEST_GET_PAY_CASH_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'payCashDashboardList', payload)
    },
    [types.REQUEST_GET_PAYMENT_DASHBOARD_SUCCESS](state, payload) {
        changeReducerState(state, 'paymentDashboardList', payload)
    },

    [types.REQUEST_GET_COURSE_ONE_SUCCESS](state, payload) {
        changeReducerStateSimple(state, 'course', payload)
    },


    [types.REQUEST_GET_AFFAIR_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'affairList', payload)
        changeSelectSimplePageable(state, 'affairListSelect', payload, ['name'])
    },
    [types.REQUEST_GET_AFFAIR_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'affairList', payload)
    },
    [types.REQUEST_GET_ORDER_AFFAIR_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'orderAffairList', payload)
    },
    [types.REQUEST_GET_ORDER_AFFAIR_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'orderAffairList', payload)
    },


    [types.REQUEST_GET_BANK_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'bankList', payload)
    },
    [types.REQUEST_GET_BANK_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'bankList', payload)
    },
    [types.REQUEST_GET_BANK_AFFAIR_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'bankAffairList', payload)
    },
    [types.REQUEST_GET_BANK_AFFAIR_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'bankAffairList', payload)
    },


    [types.REQUEST_GET_CLIENT_SUCCESS](state, payload) {
        changeSelectSimple(state, 'clientListSelect', payload, ['firstName', 'phone'])
        changeReducerState(state, 'clientList', payload)
    },

    [types.REQUEST_GET_WORKER_SUCCESS](state, payload) {
        changeSelectSimple(state, 'workerListSelect', payload, ['firstName', 'phone'])
        changeReducerState(state, 'workerList', payload)
    },


    [types.REQUEST_GET_INCOME_SUCCESS](state, payload) {
        changeReducerStatePageable(state, "incomeList", payload)
    },
    [types.REQUEST_GET_INCOME_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, "incomeList", payload)
    },

    [types.REQUEST_GET_SHIPMENT_SUCCESS](state, payload) {
        changeReducerStatePageable(state, "shipmentList", payload)
    },
    [types.REQUEST_GET_SHIPMENT_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, "shipmentList", payload)
    },

    [types.REQUEST_GET_BRAND_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'brandList', payload)
    },
    [types.REQUEST_GET_BRAND_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'brandList', payload)
    },


    [types.REQUEST_GET_CATEGORY_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'categoryList', payload)

    },
    [types.REQUEST_GET_CATEGORY_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'categoryList', payload)
    },

    // [types.REQUEST_GET_REGION_SUCCESS](state, payload) {
    // changeReducerStatePageable(state, 'regions', payload)

    // },
    [types.REQUEST_GET_REGION_SUCCESS](state, payload) {
        changeReducerState(state, 'regions', payload)
    },

    [types.REQUEST_GET_DISTRICT_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'district', payload)

    },
    [types.REQUEST_GET_ORDER_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'order', payload)
    },
    
    [types.REQUEST_GET_TEMPLATE_SUCCESS](state, payload) {
        changeReducerState(state, 'templateList', payload)
        changeSelect(state, 'templateIncomeList', payload)
    },
    [types.REQUEST_GET_TEMPLATE_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'templateList', payload)
    },


    [types.REQUEST_GET_PRODUCT_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'productList', payload)
    },
    [types.REQUEST_GET_PRODUCT_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'productList', payload)
    },

    [types.REQUEST_GET_ACCESSORY_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'accessoryList', payload)
    },
    [types.REQUEST_GET_ACCESSORY_SELECT_SUCCESS](state, payload) {
        changeSelectSimple(state, 'accessoryListSelect', payload, ['name'])
    },
    [types.REQUEST_GET_ACCESSORY_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'accessoryList', payload)
    },

    [types.REQUEST_GET_ACCESSORY_INCOME_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'accessoryIncomeList', payload)
    },
    [types.REQUEST_GET_ACCESSORY_INCOME_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'accessoryIncomeList', payload)
    },
    [types.REQUEST_GET_ACCESSORY_SHIPMENT_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'accessoryShipmentList', payload)
    },
    [types.REQUEST_GET_ACCESSORY_SHIPMENT_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'accessoryShipmentList', payload)
    },

    [types.REQUEST_GET_PAYMENT_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'paymentList', payload)
    },
    [types.REQUEST_GET_PAYMENT_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'paymentList', payload)
    },

    [types.REQUEST_GET_PAY_CASH_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'paymentList', payload)
    },
    [types.REQUEST_GET_PAY_CASH_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'paymentList', payload)
    },

    [types.REQUEST_GET_ORDER_SALARY_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'salaryList', payload)
    },
    [types.REQUEST_GET_ORDER_SALARY_SEARCH_SUCCESS](state, payload) {
        changeReducerState(state, 'salaryList', payload)
    },

    [types.REQUEST_GET_NEW_OPERATIONS_SUCCESS](state, payload) {
        state.operationList = null
        if (payload && payload.payload && payload.payload.object && payload.payload.object.operationList) {
            state.operationCount = payload.payload.object.count;
            state.operationList = payload.payload.object.operationList.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
        // changeReducerState(state, 'operationList', payload)
    },

    [types.REQUEST_GET_OPERATION_SUCCESS](state, payload) {
        changeReducerStateDate(state, 'operation', payload)
    },

    [types.REQUEST_GET_TEMPLATE_INCOME_SUCCESS](state, payload) {
        changeSelect(state, 'templateIncomeList', payload, 'lastPrice')
    },
    [types.REQUEST_GET_DISTRICT_BY_REGION_SUCCESS](state, payload) {
        console.log("OK")
        changeReducerStateSimple(state, 'districtsByRegion', payload)
    },
    [types.REQUEST_GET_TEMPLATE_SHIPMENT_SUCCESS](state, payload) {
        changeSelect(state, 'templateShipmentList', payload, 'count')
    },
    [types.REQUEST_GET_SHIPMENT_PRODUCTS_SUCCESS](state, payload) {
        changeReducerStateSimple(state, 'shipmentListProducts', payload)
    },
    [types.REQUEST_GET_ROLE_SUCCESS](state, payload) {
        changeReducerState(state, 'roleList', payload)
    },
    [types.REQUEST_GET_SECTION_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'sectionList', payload)
    },


    //Single objects Start
    [types.REQUEST_GET_AFFAIR_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "affairOne", payload)
    },
    [types.REQUEST_GET_INCOME_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "incomeOne", payload)
    },
    [types.REQUEST_GET_ORDER_AFFAIR_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "orderAffairOne", payload)
    },
    [types.REQUEST_GET_SHIPMENT_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "shipmentOne", payload)
    },
    [types.REQUEST_GET_TEMPLATE_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "templateOne", payload)
    },

    [types.REQUEST_GET_ACCESSORY_INCOME_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "accessoryIncomeOne", payload)
    },
    [types.REQUEST_GET_ACCESSORY_SHIPMENT_ONE_SUCCESS](state, payload) {
        changeReducerOne(state, "accessoryShipmentOne", payload)
    },
    [types.REQUEST_GET_REGION_SUCCESS](state, payload) {
        changeReducerStatePageable(state, 'regions', payload)
        // console.log(payload)// changeReducerOne(state,"accessoryShipmentOne",payload)
    },
    //Single objects End

    // Attachment
    [types.REQUEST_ATTACHMENT_SUCCESS](state, payload) {
        state.attachmentId = payload
    },
    [types.REQUEST_ATTACHMENT_LIST_SUCCESS](state, payload) {
        state.attachments.push(payload.payload)
    },
    [types.REQUEST_SOCIAL_ENUM_SUCCESS](state, payload) {
        state.socialEnumList = payload.payload
    },
    [types.REQUEST_ERROR](state) {
        state.loading = false;
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};
export default createReducer(initState, reducers);
