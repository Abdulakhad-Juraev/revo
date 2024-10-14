import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction} from "../../../../redux/actionFuncs/mainActions";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import Header from "../../../../component/Header/Header";
import {showHideModal} from "../../../../component/Modals/ModalFuncs";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import AccessoryShipmentForm from "./AccessoryShipmentForm";
import {ViewButton} from "../../../../component/CustomComponents/CustomButtons";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {orderAccessorySeller, orderSA, routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class AccessoryShipment extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "accessory_select"}))
        this.props.dispatch(getListAction({name: "client"}))
        this.props.dispatch(getListAction({name: "accessory_shipment"}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "accessory_shipment", page: (pageNumber - 1), size: this.props.size}))
    }



    render() {
        const {openModal, dispatch, accessoryShipmentList, page,size,totalElements, currentUser} = this.props


        const sModal = (item) => {dispatch(showHideModal(item, openModal))}

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Aksessuar sotuvi ro'yxati"} addModal={sModal} openModal={openModal}
                        filter={"accessory_shipment"}
                        isFilter={true} plus={orderSA(currentUser) || orderAccessorySeller(currentUser)}/>
                {openModal ?
                    <AccessoryShipmentForm />
                    :
                    <div className={"res-div"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory`} >
                                        Aksessuar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory-income`} >
                                        Aksessuar olish
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory-shipment`}>
                                        Aksessuar sotish
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
                                        <th>Javobgar</th>
                                        <th>Xaridor</th>
                                        <th>Batafsil</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {accessoryShipmentList ? accessoryShipmentList.map((item) =>
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
                                                    <Link to={`/${routeRole(currentUser)}/accessory-shipment/${item.id}`}>
                                                        <ViewButton/>
                                                    </Link>
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



export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, clientListSelect, accessoryShipmentList, accessoryListSelect,
             page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal,clientListSelect, accessoryShipmentList, accessoryListSelect,
        page,size,totalElements,totalPages, currentUser
    })
)(AccessoryShipment);