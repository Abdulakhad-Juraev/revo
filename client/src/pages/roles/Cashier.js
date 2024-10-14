import React, {Component} from 'react';
import 'simplebar/dist/simplebar.min.css';
import '../Cabinet/Cabinet.scss';
import {Menu} from "../../component/Menu/Menu";
import {connect} from "react-redux";
import HomeIcon from "./../../resources/favicon/homeIcon.png"
import CustomNavbar from "../../component/CustomNavbar/CustomNavbar";
import {AngleRightSvg} from "../../component/Icons";
import AffairIcon from "../../resources/favicon/affairIcon.png";
import Content from "../Content";
import ProductIcon from "../../resources/favicon/productIcon.png";
import PaymentIcon from "../../resources/favicon/payment.png";
import UsersIcon from "../../resources/favicon/usersIcon.png";


class Cashier extends Component {
    componentDidMount() {
        console.clear()
    }

    state = {
        active: false,
        sidebar: true,
        dropdown: false,

        menus : [
            { icon: HomeIcon, name: "bosh sahifa", link: "home"},
            { icon: PaymentIcon, name: "To'lovlar", link: "payment"},
            { icon: UsersIcon, name: "Xodimlar", link: "user"},
        ],
        roles : [
            "home", "payment", "user", "section", "profile","new-operations"
        ]
    }

    render() {

        const {page, subpage, identity} = this.props.match.params;
        const {menus, sidebar, roles} = this.state

        return (
            <div>
                {/*<Loading active={loading} />*/}
                <div className={"container-table"}>
                    <CustomNavbar role={"CASHIER"} />
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
                                        role={"cashier"}
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


export default connect(
    ({
         app: {loading,attachmentUrl},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl
    })
)(Cashier);