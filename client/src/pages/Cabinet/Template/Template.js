import React, {Component} from 'react';
import {Container, Table} from "reactstrap";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {connect} from "react-redux";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import Header from "../../../component/Header/Header";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {config} from "../../../utils/config";
import Pagination from "react-js-pagination";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";
import {checkAttachment} from "../../../utils/SecondaryFuncs/SecondaryFuncs";

class Template extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'template'}))
        this.props.dispatch(getListAction({name: 'category'}))
    }
    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "nomi"},
            {type : 'search', element: 'description', placeHolder : "Izoh"},
            {type : 'search', element: 'minCount', placeHolder : "minCount"},
            {type : 'search', element: 'price', placeHolder : "price"},
            {type : 'file', element: 'attachment'},
            {type : 'select', element: 'category',array:this.props.categoryList},
        ]
    }
    render() {
        const {openModal,attachmentId,categoryList, dispatch,currentObject, currentItem, templateList, page,size,totalElements,deleteModal} = this.props
        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
        }
        const saveItem = (e,v) => {
            checkStates(v, this.state, currentObject)
            checkAttachment(attachmentId, v, currentObject)
            dispatch(simpleAction(v, {cAPI : "template", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "template", type : 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Templatelar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"template"))} plus={true} filter={"template"}/>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Soni</th>
                                <th>Price</th>
                                <th>Rasm</th>
                                <th>Category</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {templateList ? templateList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>{item.minCount ?? ""}</td>
                                    <td>{item.price ?? ""}</td>
                                    <td>{item.attachment.id ? <img src={config.BASE_URL+"/attachment/"+item.attachment.id} className={"imgStyle"}  alt={""}/>: ""}</td>
                                    <td>{item.category.name ?? ""}</td>
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
                {/*<Pagination*/}
                {/*    activePage={page + 1}*/}
                {/*    itemsCountPerPage={size}*/}
                {/*    totalItemsCount={totalElements}*/}
                {/*    pageRangeDisplayed={5}*/}
                {/*    onChange={this.handlePageChange.bind(this)} itemClass="page-item"*/}
                {/*    linkClass="page-link"*/}
                {/*/>*/}

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
             currentObject,attachmentId,
             bankList,
             page,
             size,
             totalElements,
             totalPages,
             templateList,categoryList
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        bankList,
        page,attachmentId,
        size,
        totalElements,
        totalPages,
        currentUser,
        templateList,categoryList
    })
)(Template);