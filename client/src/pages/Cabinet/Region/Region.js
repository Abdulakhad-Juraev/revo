import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import Pagination from "react-js-pagination";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";

class Region extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name : 'region'}))
    }
    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "region", page: (pageNumber - 1), size: this.props.size}))
    }
    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "nomi"},
        ]
    }

    render() {

        const {openModal,dispatch,currentItem,bankList,deleteModal, page,size,totalElements,currentUser,regions} = this.props
        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "region", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "region", type : 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Regionlar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"region"))} plus={true} filter={"region"} isFilter={true}/>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {regions ? regions.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>
                                        <EditButton fun={() => sModal(item)} />
                                        <DeleteButton fun={() => dModal(item.id)} />
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


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, bankList, page,size,totalElements,totalPages,regions
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, bankList, page,size,totalElements,totalPages,currentUser,regions
    })
)(Region);