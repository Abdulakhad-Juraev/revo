import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Pagination from "react-js-pagination";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Header from "../../../component/Header/Header";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";

class District extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'district'}))
        this.props.dispatch(getListAction({name: 'regions'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name: "district", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm: [
            {type: 'hidden', element: 'id'},
            {type: 'search', element: 'name', placeHolder: "nomi"},
            {type: 'select', element: 'region', placeHolder: "Region tanlang",array:this.props.regions},
        ]
    }


    render() {
        const {
            openModal,
            dispatch,
            currentItem,
            district,
            deleteModal,
            page,
            size,
            totalElements,
            currentUser
            ,regions,currentObject
        } = this.props

        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
        }

        const saveItem = (e, v) => {
            checkStates(v, this.state, currentObject)
            dispatch(simpleAction(v, {cAPI: "district", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem, {cAPI: "district", type: 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Districtlar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"district"))} plus={true}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Region</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {district ? district.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>{item.region.name ?? ""}</td>
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

                <SimpleModal onSubmit={saveItem} state={this.state}/>
                <DeleteModal onSubmit={deleteItem}/>
            </Container>
        );
    }
}


export default connect(
    ({
         app: {
         regions, openModal, deleteModal, currentItem, currentObject, district, page, size, totalElements, totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        district,
        page,
        size,currentObject,
        totalElements,
        totalPages,
        currentUser
        ,regions
     })
)(District);