import React, {Component} from 'react';
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {connect} from "react-redux";
import {Container, Table} from "reactstrap";
import Header from "../../../component/Header/Header";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";

class Product extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: 'product'}))
        this.props.dispatch(getListAction({name: 'template'}))
        this.props.dispatch(getListAction({name: 'user'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name: "product", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm: [
            {type: 'hidden', element: 'id'},
            {type: 'search', element: 'count', placeHolder: "Soni",},
            {type: 'search', element: 'leftOver', placeHolder: "Qoldiq",},
            {
                type: 'select',
                element: 'productTemplate',
                placeHolder: "Template tanlang",
                array: this.props.templateList
            },
            {type: 'select', element: 'worker', placeHolder: "Ishchini tanlang", array: this.props.userList},
        ]
    }

    render() {
        const {
            openModal,
            dispatch,
            page,
            size,
            totalElements,
            userList,
            currentItem,
            productList,
            deleteModal
        } = this.props
        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
        }
        const saveItem = (e, v) => {
            dispatch(simpleAction(v, {cAPI: "product", type: v.id !== '' ? "edit" : "save"}))
        }
        const deleteItem = () => {

            dispatch(simpleAction(currentItem, {cAPI: "product", type: 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Mahsulotlar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e, "product"))} plus={true}/>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Count</th>
                                <th>LeftOver</th>
                                <th>Template</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productList ? productList.map((item, i) =>
                                <tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td>{item.count ?? ""}</td>
                                    <td>{item.leftOver ?? ""}</td>
                                    <td>{item.productTemplate && item.productTemplate.name}</td>
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
                <SimpleModal onSubmit={saveItem} state={this.state}/>
                <DeleteModal onSubmit={deleteItem}/>

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
             productList,
             templateList, userList
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        bankList,
        page,
        size,
        totalElements,
        totalPages,
        currentUser, userList,
        templateList,
        productList
    })
)(Product);