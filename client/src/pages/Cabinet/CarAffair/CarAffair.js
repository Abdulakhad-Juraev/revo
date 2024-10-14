import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import Pagination from "react-js-pagination";
import {orderCarService, orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class CarAffair extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'car'}))
        this.props.dispatch(getListAction({name: 'car_affair'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "car_affair", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'description', placeHolder : "izoh"},
            {type : 'number', element: 'price', placeHolder : "summa"},
            {type: "select", element: "car", array: this.props.carList},
            {type : "radio", element : 'in', array : [{value : true, label:"Kiruvchi"},{value : false, label:"Chiquvchi"}]}
        ]
    }
    render() {
        const {openModal,dispatch,currentItem,carAffairList,deleteModal, page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "car_affair", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "car_affair", type : 'delete'}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Mashina xizmatlari ro'yxati"} addModal={sModal} openModal={openModal} filter={"car_affair"}
                        isFilter={true} plus={orderSA(currentUser) || orderCarService(currentUser)}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/car`} >
                                        Mashinalar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-active"}>
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
                                <th>Izoh</th>
                                <th>Summa</th>
                                <th>Mashina</th>
                                <th>Sana</th>
                                <th>Holat</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {carAffairList ? carAffairList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.description ?? ""}</td>
                                    <td>{getNumberLLL(item.price ?? "")}</td>
                                    <td>{item.car.name ?? ""}</td>
                                    <td>{getDateLLL(item.date) ?? ""}</td>
                                    <td>{item.in === true ? "Kiruvchi" : "Chiquvchi" ?? ""}</td>
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

CarAffair.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, carAffairList, carList, incomeList, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, carAffairList, carList, incomeList, page,size,totalElements,totalPages, currentUser
    })
)(CarAffair);