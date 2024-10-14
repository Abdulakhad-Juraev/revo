import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import SimpleModal from "../../../component/Modals/SimpleModal";
import Header from "../../../component/Header/Header";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";

class BankAffair extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'bank_affair'}))
        this.props.dispatch(getListAction({name: 'bank'}))
        console.clear()
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "bank_affair", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'description', placeHolder : "Izoh"},
            {type : "number", element: "price", placeHolder : "Narx"},
            {type : "select", element: "bank", array: this.props.bankList, placeHolder : "Mijozni tanlang"},
            {type : "radio", element : 'in', array : [{value : true, label:"Kiruvchi"},{value : false, label:"Chiquvchi"}]}
        ]
    }

    render() {
        const {openModal,dispatch,currentItem,deleteModal, bankAffairList,  page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            console.log(v)
            dispatch(simpleAction(v, {cAPI : "bank_affair", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "bank_affair", type : 'delete'}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Bank xizmatlari ro'yxati"} addModal={sModal} openModal={openModal} plus={true} filter={"bank_affair"}
                        isFilter={true}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/bank`} >
                                        Banklar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/bank-affair`}>
                                        Bank xizmati
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Izoh</th>
                                <th>Narxi</th>
                                <th>Bank</th>
                                <th>Holat</th>
                                <th>Sana</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bankAffairList ? bankAffairList.map((item,i) =>
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{item.description ?? ""}</td>
                                    <td>{getNumberLLL(item.price ?? "")}</td>
                                    <td>{item.bank.name ?? ""}</td>
                                    <td>{item.in === true ? "Kiruvchi" : "Chiquvchi" ?? ""}</td>
                                    <td>{getDateLLL(item.date) ?? ""}</td>
                                    <td>
                                        <EditButton fun={() => sModal(item)} />
                                        <DeleteButton fun={() => dModal(item.id)} />
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

                <SimpleModal state={this.state} onSubmit={saveItem}/>
                <DeleteModal onSubmit={deleteItem} />
            </Container>
        );
    }
}

BankAffair.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, orderAffairList, bankList, bankAffairList,  page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, orderAffairList, bankList, bankAffairList, page,size,totalElements,totalPages,currentUser
    })
)(BankAffair);