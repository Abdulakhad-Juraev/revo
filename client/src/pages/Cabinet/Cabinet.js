import React, {Component} from 'react';
import './Cabinet.scss';
import Content from "../Content";
import {Menu} from "../../component/Menu/Menu";
import {connect} from "react-redux";
import {getListAction} from "../../redux/actionFuncs/mainActions";
import CustomNavbar from "../../component/CustomNavbar/CustomNavbar";
import HomeIcon from "./../../resources/favicon/homeIcon.png"
import UsersIcon from "./../../resources/favicon/usersIcon.png"
import ProductIcon from "./../../resources/favicon/productIcon.png"
import ExpenseIcon from "./../../resources/favicon/expenseIcon.png"
import CarIcon from "./../../resources/favicon/carIcon.png"
import AffairIcon from "./../../resources/favicon/affairIcon.png"
import BankIcon from "./../../resources/favicon/bankIcon.png"
import AccessoryIcon from "./../../resources/favicon/accessoryIcon.png"
import ActionsIcon from "./../../resources/favicon/actionsIcon.png"
import PaymentIcon from "./../../resources/favicon/payment.png"
import {AngleRightSvg} from "../../component/Icons";


class Cabinet extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: "role"}))
        this.props.dispatch(getListAction({name: "new_operations"}))
        this.props.dispatch(getListAction({name: 'car'}))
        console.clear()
    }


    state = {
        active: false,
        sidebar: true,
        menus : [
            { icon: HomeIcon, name: "bosh sahifa", link: "home"},
            // { icon: ActionsIcon, name: "Kunlik amallar", link: "actions"},
            // { icon: PaymentIcon, name: "To'lovlar", link: "payment"},
            // { icon: UsersIcon, name: "Xodimlar", link: "user"},
            // { icon: ProductIcon, name: "ombor", link: "product"},
            // { icon: ExpenseIcon, name: "harajat", link: "expense"},
            // { icon: CarIcon, name: "mashina", link: "car"},
            // { icon: AffairIcon, name: "xizmatlar", link: "affair"},
            // { icon: BankIcon, name: "bank", link: "bank"},
            { icon: AccessoryIcon, name: "Product", link: "productlar"},
            { icon: AccessoryIcon, name: "Category", link: "category"},
            { icon: AccessoryIcon, name: "Template", link: "template"},
            { icon: AccessoryIcon, name: "Region", link: "region"},
            { icon: AccessoryIcon, name: "District", link: "district"},
            { icon: AccessoryIcon, name: "Shipment", link: "shipment"},
            { icon: AccessoryIcon, name: "User", link: "user"},
        ],
        roles : [
            "all"
        ]
    }



    render() {

        const {page, subpage, identity} = this.props.match.params;
        const {menus, sidebar,roles} = this.state


        return (
            <div>
                <div className={"container-table"}>
                    <CustomNavbar role={"ADMIN"} />
                    <div className={sidebar ? "open-close open-close-active" : "open-close"}>
                        <div className={"open-close-btn"} onClick={() => {this.setState({sidebar : !sidebar})}}>
                            <AngleRightSvg />
                        </div>
                    </div>

                    <div className={"main-content"}>
                        <div className={sidebar ? "left-sidebar left-sidebar-active" : "left-sidebar"}>
                            {
                                menus ? menus.map(item =>
                                    <Menu
                                        icon={item.icon}
                                        role={"admin"}
                                        name={item.name}
                                        link={item.link}
                                        page={page}
                                    />
                                ) : ''
                            }
                        </div>
                        <Content page={page} subpage={subpage} identity={identity} sidebar={sidebar} roles={roles}/>
                    </div>
            </div>

            </div>
        );
    }
}

Cabinet.propTypes = {};

export default connect(
    ({
         app: {loading,attachmentUrl,operationCount},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl,operationCount
    })
)(Cabinet);