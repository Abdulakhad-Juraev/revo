import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../../../component/Header/Header";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {Container, Table} from "reactstrap";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";
import {config} from "../../../utils/config";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";
import {checkAttachment} from "../../../utils/SecondaryFuncs/SecondaryFuncs";

class Category extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'category'}))
    }
    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "category", page: (pageNumber - 1), size: this.props.size}))
    }
    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "nomi",},
            {type : 'search', element: 'description', placeHolder : "izoh",},
            {type : 'file', element: 'attachment'}
        ]
    }
    render() {
        const {openModal,attachmentId, dispatch,page,size,currentObject ,totalElements, currentItem, categoryList, deleteModal} = this.props
        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
        }
        const saveItem = (e,v) => {
            checkStates(v, this.state, currentObject)
            checkAttachment(attachmentId, v, currentObject)
            dispatch(simpleAction(v, {cAPI : "category", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "category", type : 'delete'}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Categoriyalar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e, "category"))} plus={true}/>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Izoh</th>
                                <th>Foto</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categoryList ? categoryList.map((item, i) =>
                                <tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>{item.description.substring(0,20)}{item.description.length > 20 ? "..." : ''}</td>
                                    <td>{item.attachment.id ? <img src={config.BASE_URL+"/attachment/"+item.attachment.id} className={"imgStyle"} />: ""}</td>

                                    <td>
                                        <EditButton fun={() => sModal(item)}/>
                                        <DeleteButton fun={() => dModal(item.id)}/>
                                    </td>
                                </tr>
                            ) : <h1 className={"ml-2"}>Malumot mavjud emas</h1>}
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
             openModal,
             deleteModal,
             currentItem,
             currentObject,
             bankList,
             page,
             size,
             totalElements,
             totalPages,
             categoryList,attachmentId
         },
         auth: {currentUser}
     }) => ({
        openModal,attachmentId,
        deleteModal,
        currentItem,
        currentObject,
        bankList,
        page,
        size,
        totalElements,
        totalPages,
        currentUser,
        categoryList
    })
)(Category);