import React, {Component} from 'react';
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import "../Product.scss"
import {getListAction} from "../../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import Header from "../../../../component/Header/Header";
import {showHideModal} from "../../../../component/Modals/ModalFuncs";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {Link} from "react-router-dom";
import {ViewButton} from "../../../../component/CustomComponents/CustomButtons";
import AccessoryIncomeForm from "./AccessoryIncomeForm";
import Pagination from "react-js-pagination";
import {orderAccessorySeller, orderSA, routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class AccessoryIncome extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "accessory_select"}))
        this.props.dispatch(getListAction({name: "client"}))
        this.props.dispatch(getListAction({name: "accessory_income"}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name: "accessory_income", page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {openModal, dispatch, accessoryIncomeList, page, size, totalElements, currentUser} = this.props

        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Aksessuar olish ro'yxati"} addModal={sModal} openModal={openModal}
                        filter={"accessory_income"}
                        isFilter={true} plus={orderSA(currentUser) || orderAccessorySeller(currentUser)}/>
                {openModal ?
                    <AccessoryIncomeForm/>
                    :
                    <div className={"custom-res-div"}>
                        <div className={"custom-res-div2"}>
                            <Nav tabs className={"bg-white"}>
                                <NavItem className={"tab-item-style-default1"}>
                                    <NavLink>
                                        <Link to={`/${routeRole(currentUser)}/accessory`}>
                                            Aksessuar
                                        </Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem className={"tab-item-style-active"}>
                                    <NavLink>
                                        <Link to={`/${routeRole(currentUser)}/accessory-income`}>
                                            Aksessuar olish
                                        </Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem className={"tab-item-style-default1"}>
                                    <NavLink>
                                        <Link to={`/${routeRole(currentUser)}/accessory-shipment`}>
                                            Aksessuar sotish
                                        </Link>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Table className={"bg-white"}>
                                <thead>
                                <tr>
                                    <th>Shartnoma raqami</th>
                                    <th>Sana</th>
                                    <th>Summa</th>
                                    <th>Javobgar</th>
                                    <th>Xaridor</th>
                                    <th>Batafsil</th>
                                </tr>
                                </thead>
                                <tbody>
                                {accessoryIncomeList ? accessoryIncomeList.map((item) =>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{getDateLLL(item.date)}</td>
                                            <td>{getNumberLLL(item.price)}</td>
                                            <td>
                                                <CustomTableTooltipUser user={item.user}/>
                                            </td>
                                            <td>
                                                <CustomTableTooltipUser user={item.client}/>
                                            </td>
                                            <td>
                                                <Link to={`/${routeRole(currentUser)}/accessory-income/${item.id}`}>
                                                    <ViewButton/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    ""}
                                </tbody>
                            </Table>
                            <Pagination
                                activePage={page + 1}
                                itemsCountPerPage={size}
                                totalItemsCount={totalElements}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>

                }
            </Container>
        );
    }
}


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, clientListSelect, accessoryIncomeList, accessoryListSelect,
             page, size, totalElements, totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal, clientListSelect, accessoryIncomeList, accessoryListSelect,
        page, size, totalElements, totalPages, currentUser
    })
)(AccessoryIncome);