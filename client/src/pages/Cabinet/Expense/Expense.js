import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../../../component/Header/Header";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {Container, Table} from "reactstrap";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import Pagination from "react-js-pagination";
import {orderSA} from "../../../utils/SecondaryFuncs/nameOfRole";

class Expense extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'expense'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "expense", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'description', placeHolder : "izoh"},
            {type : 'number', element: 'price', placeHolder : "Summa"},
        ]
    }
    render() {
        const {openModal,dispatch,currentItem,expenseList,deleteModal,page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "expense", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "expense", type : 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Harajatlar ro'yxati"} addModal={sModal} openModal={openModal} filter={"expense"}
                        isFilter={true} plus={true}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Summa</th>
                                <th>Sana</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {expenseList ? expenseList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.description ?? ""}</td>
                                    <td>{getNumberLLL(item.price ?? "")}</td>
                                    <td>{getDateLLL(item.date) ?? ""}</td>
                                    <td>
                                        {orderSA(currentUser) === true ? <EditButton fun={() => sModal(item)} /> : ""}
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

Expense.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             expenseList, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, expenseList, page,size,totalElements,totalPages, currentUser
    })
)(Expense);