import React, {Component} from 'react';
import 'simplebar/dist/simplebar.min.css';
import '../Cabinet/Cabinet.scss';
import {Menu} from "../../component/Menu/Menu";
import {connect} from "react-redux";
import HomeIcon from "./../../resources/favicon/homeIcon.png"
import ProductIcon from "./../../resources/favicon/productIcon.png"
import ExpenseIcon from "./../../resources/favicon/expenseIcon.png"
import TemplateIcon from "./../../resources/favicon/templateIcon.png"
import AccessoryIcon from "./../../resources/favicon/accessoryIcon.png"
import CustomNavbar from "../../component/CustomNavbar/CustomNavbar";
import ActionsIcon from "../../resources/favicon/actionsIcon.png";
import UsersIcon from "../../resources/favicon/usersIcon.png";
import CarIcon from "../../resources/favicon/carIcon.png";
import AffairIcon from "../../resources/favicon/affairIcon.png";
import BankIcon from "../../resources/favicon/bankIcon.png";
import {AngleRightSvg} from "../../component/Icons";
import PaymentIcon from "../../resources/favicon/payment.png";
import Content from "../Content";


class Accountant extends Component {
    componentDidMount() {
        console.clear()
    }

    state = {
        active: false,
        sidebar: true,
        dropdown: false,

        menus : [
            { icon: HomeIcon, name: "bosh sahifa", link: "home"},
            { icon: ActionsIcon, name: "Kunlik amallar", link: "actions"},
            { icon: PaymentIcon, name: "To'lovlar", link: "payment"},
            { icon: UsersIcon, name: "Xodimlar", link: "user"},
            { icon: ProductIcon, name: "ombor", link: "product"},
            { icon: ExpenseIcon, name: "harajat", link: "expense"},
            { icon: CarIcon, name: "mashina", link: "car"},
            { icon: AffairIcon, name: "xizmatlar", link: "affair"},
            { icon: BankIcon, name: "bank", link: "bank"},
            { icon: AccessoryIcon, name: "Aksessuar", link: "accessory"},
        ],
        roles : [
            "all"
        ]
    }

    render() {

        const {page, subpage, identity} = this.props.match.params;
        const {menus, sidebar, roles} = this.state

        return (
            <div>
                {/*<Loading active={loading} />*/}
                <div className={"container-table"}>
                    <CustomNavbar role={"ACCOUNTANT"} />
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
                                        role={"accountant"}
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

Accountant.propTypes = {};

export default connect(
    ({
         app: {loading,attachmentUrl},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl
    })
)(Accountant);