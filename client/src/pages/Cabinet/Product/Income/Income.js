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
import IncomeForm from "./IncomeForm";
import Pagination from "react-js-pagination";
import {searchListFun} from "../../../../redux/actionFuncs/inputFuncs";
import {
    orderAccountant,
    orderClient,
    orderSA,
    orderSeller,
    routeRole
} from "../../../../utils/SecondaryFuncs/nameOfRole";

class Income extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "template"}))
        // this.props.dispatch(getListAction({name: "client"}))
        // this.props.dispatch(getListAction({name: "income"}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name: "income", page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {openModal, dispatch, incomeList, page, size, totalElements, currentUser, templateList} = this.props
        console.log(templateList)
        console.log("OK")
        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Oyna olish ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e, "income"))}
                        filter={"income"}
                        isFilter={true} plus={orderSA(currentUser) || orderSeller(currentUser)}/>
                {openModal ?
                    <IncomeForm/>
                    :
                    <div className={"custom-res-div"}>
                        <div className={"custom-res-div2"}>
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
                                <NavItem className={"tab-item-style-default1"}>
                                    <NavLink>
                                        <Link to={`/${routeRole(currentUser)}/shipment`}>
                                            Oyna sotish
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
                                    <th>Qabul qiluvchi</th>
                                    <th>Xaridor</th>
                                    <th>Batafsil</th>
                                </tr>
                                </thead>
                                <tbody>
                                {incomeList ? incomeList.map((item) =>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{getDateLLL(item.acceptedDate)}</td>
                                            <td>{getNumberLLL(item.price)}</td>
                                            <td>
                                                <CustomTableTooltipUser user={item.user}/>
                                            </td>
                                            <td>
                                                <CustomTableTooltipUser user={item.client}/>
                                            </td>
                                            <td>
                                                <Link to={`/${routeRole(currentUser)}/income/${item.id}`}>
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

Income.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, templateIncomeList, clientListSelect, incomeList,
             page, size, totalElements, totalPages, templateList
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal, templateIncomeList, clientListSelect, incomeList,
        page, size, totalElements, totalPages, currentUser, templateList
    })
)(Income);