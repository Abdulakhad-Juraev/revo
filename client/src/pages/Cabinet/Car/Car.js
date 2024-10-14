import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import Pagination from "react-js-pagination";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {orderCarService, orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class Car extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'car'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "car", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "nomi"},
        ]
    }

    render() {
        const {openModal,dispatch,currentItem,carList,deleteModal, page,size,totalElements, currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "car", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "car", type : 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Mashinalar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"car"))} plus={orderSA(currentUser) || orderCarService(currentUser)}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/car`} >
                                        Mashinalar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/car-affair`}>
                                        Mashina xizmati
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carList ? carList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>
                                        <EditButton fun={() => sModal(item)} />
                                        {orderSA(currentUser) === true ? <DeleteButton fun={() => dModal(item.id)} /> : ""}
                                    </td>
                                </tr>
                            ) : <h1>Malumot mavjud emas</h1>}
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

                <SimpleModal onSubmit={saveItem} state={this.state} />
                <DeleteModal onSubmit={deleteItem} />
            </Container>
        );
    }
}

Car.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, carList, incomeList, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, carList, incomeList, page,size,totalElements,totalPages, currentUser
    })
)(Car);