import React, {Component} from 'react';
import {connect} from "react-redux";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import Header from "../../../component/Header/Header";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {Link} from "react-router-dom";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import Pagination from "react-js-pagination";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";

class Order extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name : 'order'}))
        this.props.dispatch(getListAction({name : 'template'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "order", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'count', placeHolder : "Soni"},
            {type : 'select', element: 'productTemplate', placeHolder : "Template Nomi" ,array:this.props.templateList},
        ]
    }
    render() {
        const {openModal,dispatch,currentObject,currentItem,order,deleteModal,templateList, page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            checkStates(v, this.state, currentObject)
                dispatch(simpleAction(v, {cAPI : "order", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "order", type : 'delete'}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Orderlar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e,"order"))} plus={true}/>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Template</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order ? order.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.count ?? ""}</td>
                                    <td>{item.productTemplate.name ?? ""}</td>
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

Order.propTypes = {};
export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, templateList,currentObject, order, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem,templateList, currentObject, order, page,size,totalElements,totalPages,currentUser
    })
)(Order);
