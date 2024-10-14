import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, getListActionOrdered} from "../../../../redux/actionFuncs/mainActions";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import Header from "../../../../component/Header/Header";
import {showHideModal} from "../../../../component/Modals/ModalFuncs";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import ShipmentForm from "./ShipmentForm";
import ShipmentFormS from "./ShipmentFormS";
import {PlusButton, ViewButton} from "../../../../component/CustomComponents/CustomButtons";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {searchListFun} from "../../../../redux/actionFuncs/inputFuncs";
import {
    orderAccountant, orderClient,
    orderOperator,
    orderSA,
    orderSeller,
    routeRole
} from "../../../../utils/SecondaryFuncs/nameOfRole";

class Shipment extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "template_shipment"}))
        this.props.dispatch(getListAction({name: "client"}))
        this.props.dispatch(getListAction({name: "shipment"}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name: "shipment", page: (pageNumber - 1), size: this.props.size}))
    }


    render() {
        const {openModal, dispatch, shipmentList, page, size, totalElements, currentUser} = this.props


        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Oyna sotuvi ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e, "shipment"))} filter={"shipment"}
                        isFilter={true} plus={orderSA(currentUser) || orderSeller(currentUser) || orderOperator(currentUser)}/>
                {openModal ?
                    // orderSA(currentUser) || orderSeller(currentUser) ?
                        <ShipmentForm/>
                        // :
                        // <ShipmentFormS/>
                    :
                    <div className={"res-div"}>
                        <Nav tabs className={"bg-white"}>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/product`}>
                                        Ombor
                                    </Link>
                                </NavLink>
                            </NavItem>
                            {orderSA(currentUser) || orderAccountant(currentUser) || orderSeller(currentUser) || orderClient(currentUser) ?
                                <NavItem className={"tab-item-style-default1"}>
                                    <NavLink>
                                        <Link to={`/${routeRole(currentUser)}/income`} >
                                            Oyna olish
                                        </Link>
                                    </NavLink>
                                </NavItem> : ''
                            }
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/shipment`}>
                                        Oyna sotish
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <div className={"custom-res-div p-0"}>
                            <div className={"custom-res-div2"}>
                                <Table className={"bg-white"}>
                                    <thead>
                                    <tr>
                                        <th>Shartnoma raqami</th>
                                        <th>Sana</th>
                                        <th>Summa</th>
                                        <th>Qabul qiluvchi</th>
                                        <th>Xaridor</th>
                                        <th>Amal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {shipmentList ? shipmentList.map((item) =>
                                            <tr key={item.id}>
                                                <td>{item.id ?? ""}</td>
                                                <td>{getDateLLL(item.date)}</td>
                                                <td>{getNumberLLL(item.price)} so'm</td>
                                                <td>
                                                    <CustomTableTooltipUser user={item.user}/>
                                                </td>
                                                <td>
                                                    <CustomTableTooltipUser user={item.client !== null ? item.client : ''}/>
                                                </td>
                                                <td>
                                                    <Link to={`/${routeRole(currentUser)}/shipment/${item.id}`}>
                                                        <ViewButton/>
                                                    </Link>
                                                    {orderSA(currentUser) || orderAccountant(currentUser) || orderOperator(currentUser) ?
                                                        <Link to={`/${routeRole(currentUser)}/order-shipment/${item.id}`}>
                                                            <PlusButton/>
                                                        </Link> : ''
                                                    }
                                                </td>
                                            </tr>
                                        )
                                        :
                                        ""}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <Pagination
                            activePage={page + 1}
                            itemsCountPerPage={size}
                            totalItemsCount={totalElements}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                            linkClass="page-link"
                        />

                    </div>
                }

            </Container>
        );
    }
}

Shipment.propTypes = {};


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, templateShipmentList, shipmentListProducts, clientListSelect, shipmentList,
             page, size, totalElements, totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        attachmentId,
        attachmentUrl,
        viewImageModal,
        templateShipmentList,
        shipmentListProducts,
        clientListSelect,
        shipmentList,
        page,
        size,
        totalElements,
        totalPages,
        currentUser
    })
)(Shipment);