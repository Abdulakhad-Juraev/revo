import React, {Component} from 'react';
import {makeFirstCapital} from "../../utils/PrimaryUtils";
import {Link} from "react-router-dom";
import "./Menu.scss";

export class Menu extends Component {

    render() {

        const {icon, name, page, link,role} = this.props

        return (
            link ?
                <div className={"menu text-center" + (page === link ? " active-menu" : "")}>
                    <Link to={`/${role}/${link}`}>
                        <img src={icon} className={"img-thumbnail w-50"} alt={""}/>
                        <p className={"mb-0"}>{makeFirstCapital(name)}</p>
                    </Link>
                </div>
                : ""
        );
    }

}