import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, getListActionOrdered} from "../../../redux/actionFuncs/mainActions";
import {showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import {Table, NavItem, NavLink, Nav, Container} from "reactstrap";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import Pagination from "react-js-pagination";
import OrderAffairForm from "./OrderAffairForm";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import {ViewButton} from "../../../component/CustomComponents/CustomButtons";
import {Link} from "react-router-dom";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {orderOperator, orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import "./OrderAffair.scss";

class OrderAffair extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'affair'}))
        this.props.dispatch(getListAction({name: 'order_affair'}))
        this.props.dispatch(getListAction({name: 'client'}))
        console.clear()
    }

    handlePageChange(pageNumber) {
            this.props.dispatch(getListAction({name : "order_affair", page: (pageNumber - 1), size: this.props.size}))

    }

    render() {

        const {openModal,dispatch, orderAffairList,page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}


        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Xizmat ko'rsatish ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"order_affair"))}
                        filter={"order_affair"}
                        isFilter={true}  plus={orderSA(currentUser) || orderOperator(currentUser)}/>

                {openModal ?
                    <OrderAffairForm />
                :

                    <div className={"res-div"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/affair`} >
                                        Xizmat turlari
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/order-affair`}>
                                        Xizmat ko'rsatish
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
                                                <th>Xizmatlar soni</th>
                                                <th>Summa</th>
                                                <th>Sana</th>
                                                <th>Mijoz</th>
                                                <th>Javobgar shaxs</th>
                                                <th>Amal</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {orderAffairList ? orderAffairList.map((item) =>
                                                    <tr key={item.id}>
                                                        <td>{item.id ?? ''}</td>
                                                        <td>{item.affairList.length ?? ''}</td>
                                                        <td>{getNumberLLL(item.price)}</td>
                                                        <td>{getDateLLL(item.date)}</td>
                                                        <td><CustomTableTooltipUser user={item.client} /></td>
                                                        <td><CustomTableTooltipUser user={item.user} /></td>
                                                        <td>
                                                            <Link to={`/${routeRole(currentUser)}/order-affair/${item.id}`}>
                                                                <ViewButton />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                            ) : <h1>Ma'lumot mavjud emas!</h1>}
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

OrderAffair.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, orderAffairList, carList, clientList, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, orderAffairList, carList, clientList, page,size,totalElements,totalPages, currentUser
    })
)(OrderAffair);