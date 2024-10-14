import React, {Component} from 'react';
import "./Content.scss";
import NotFound from "./Public/NotFound";
import Home from "./Cabinet/Home/Home";
import Template from "./Cabinet/Template/Template";
import Profil from "./Cabinet/Profil/Profil";
import Income from "./Cabinet/Product/Income/Income";
import NewOperations from "./Cabinet/Product/New-operations/NewOperations";
import IncomeOne from "./Cabinet/Product/Income/AcceptIncome";
// import Shipment from "./Cabinet/Shipment/Shipment";
import Shipment from "./Cabinet/Product/Shipment/Shipment";
import ShipmentOne from "./Cabinet/Product/Shipment/AcceptShipment";
import User from "./Cabinet/User/User";
import {connect} from "react-redux";
import {getListAction} from "../redux/actionFuncs/mainActions";
import Expense from "./Cabinet/Expense/Expense";
import Car from "./Cabinet/Car/Car";
import CarAffair from "./Cabinet/CarAffair/CarAffair";
import Affair from "./Cabinet/Affair/Affair";
import OrderAffair from "./Cabinet/OrderAffair/OrderAffair";
import Bank from "./Cabinet/Bank/Bank";
import BankAffair from "./Cabinet/BankAffair/BankAffair";
import Accessory from "./Cabinet/Accessory/Accessory";
import UserOne from "./Cabinet/User/UserOne";
import Actions from "./Cabinet/Actions/Actions";
import Dashboard from "./Cabinet/Dashboard/Dashboard";
import OrderAffairOne from "./Cabinet/OrderAffair/OrderAffairOne";
// import Section from "./Cabinet/Section/Section";
import AffairOne from "./Cabinet/Affair/AffairOne";
import Payment from "./Cabinet/Payment/Payment";
import AccessoryIncome from "./Cabinet/AccessoryAffair/Income/AccessoryIncome";
import AccessoryIncomeOne from "./Cabinet/AccessoryAffair/Income/AccessoryIncomeOne";
import AccessoryShipmentOne from "./Cabinet/AccessoryAffair/Shipment/AccessoryShipmentOne";
import AccessoryShipment from "./Cabinet/AccessoryAffair/Shipment/AccessoryShipment";
import OrderAffairShipment from "./Cabinet/OrderAffair/OrderAffairShipment";
import TemplateOne from "./Cabinet/Template/TemplateOne";
import Region from "./Cabinet/Region/Region";
import Category from "./Cabinet/Category/Category";
import Product from "./Cabinet/Product/product";
import District from "./Cabinet/District/District";
import Order from "./Cabinet/Order/Order";

class Content extends Component {
    componentDidMount() {
        this.setState({page : this.props.page})
        this.setState({subpage : this.props.subpage})
        console.clear()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.page !== prevState.page || prevProps.subpage !== prevState.subpage){
            this.props.dispatch(getListAction({name : "new_operations"}))

            this.setState({page : prevProps.page})
            this.setState({subpage : prevProps.subpage})
        }
    }


    state = {
        page : "",
        subpage : ""
    }

    render() {
        const {page, subpage, sidebar,roles} = this.props



        const choosePage = () => {
            switch (page) {
                case "home" :
                    return <Home/>

                case "user" :
                    if (subpage && subpage !== ""){
                        return <UserOne identity={subpage} />
                    }
                    return <User/>

                // case "user-debt" :
                //     return <UserWithDebt/>

                case "dashboard" :
                    return <Dashboard/>

                case "income" :
                    if (subpage && subpage !== ""){
                        return <IncomeOne identity={subpage} />
                    }
                    return <Income />

                case "shipment" :
                    if (subpage && subpage !== ""){
                        return <ShipmentOne identity={subpage} />
                    }
                    return <Shipment />

                case "product" :
                    if (subpage && subpage !== ""){
                        return <TemplateOne identity={subpage} />
                    }
                    return <Template/>

                case "new-operations" :
                    return <NewOperations/>

                case "profile" :
                    return <Profil/>

                case "expense" :
                    return <Expense/>

                case "car" :
                    return <Car/>

                case "car-affair" :
                    return <CarAffair/>

                case "region" :
                    return <Region/>
                case "district" :
                    return <District/>
                case "order" :
                    return <Order/>

                case "category" :
                    return <Category/>
                case "productlar" :
                    return <Product/>
                case "template" :
                    return <Template/>

                case "affair" :
                    if (subpage && subpage !== ""){
                        return <AffairOne identity={subpage} />
                    }
                    return <Affair/>

                case "order-affair" :
                    if (subpage && subpage !== ""){
                        return <OrderAffairOne identity={subpage} />
                    }
                    return <OrderAffair/>

                case "order-shipment" :
                    if (subpage && subpage !== ""){
                        return <OrderAffairShipment identity={subpage} />
                    }
                    return <OrderAffair/>

                case "bank" :
                    return <Bank/>

                case "bank-affair" :
                    return <BankAffair/>

                case "accessory" :
                    return <Accessory/>

                case "accessory-income" :
                    if (subpage && subpage !== ""){
                        return <AccessoryIncomeOne identity={subpage} />
                    }
                    return <AccessoryIncome/>

                case "accessory-shipment" :
                    if (subpage && subpage !== ""){
                        return <AccessoryShipmentOne identity={subpage} />
                    }
                    return <AccessoryShipment/>

                case "actions" :
                    return <Actions/>

                case "payment" :
                    return <Payment/>

                // case "section" :
                //     if (subpage && subpage !== ""){
                //         return <SectionOne identity={subpage} />
                //     }
                //     return <Section />

                default :
                    return <NotFound/>;
            }
        }


        const checkRole = () => {
            return roles[0] === "all" || roles.includes(page)
        }
        return (
            <div className={sidebar ? "content" : "content content-active"}>
                {checkRole() ? choosePage() : <NotFound />}
            </div>
        );
    }
}

Content.propTypes = {};

export default connect(
    ({
         app: {loading,attachmentUrl,operationCount},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl,operationCount
    })
)(Content);
