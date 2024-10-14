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


class Moderator extends Component {
    componentDidMount() {
        console.clear()
    }

    state = {
        active: false,
        sidebar: true,
        dropdown: false,

        menus : [
            { icon: HomeIcon, name: "bosh sahifa", link: "home"},
            { icon: AffairIcon, name: "xizmatlar", link: "affair"},
        ],
        roles : [
            "home", "affair", "product", "section", "order-affair", "profile", "new-operations"
        ]
    }

    render() {

        const {page, subpage, identity} = this.props.match.params;
        const {menus, sidebar, roles} = this.state

        return (
            <div>
                {/*<Loading active={loading} />*/}
                <div className={"container-table"}>
                    <CustomNavbar role={"WORKER"} />
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
                                        role={"worker"}
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

Moderator.propTypes = {};

export default connect(
    ({
         app: {loading,attachmentUrl},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl
    })
)(Moderator);