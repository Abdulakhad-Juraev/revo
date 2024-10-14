import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {DeleteButton, EditButton, ViewButton} from "../../../component/CustomComponents/CustomButtons";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {
    orderAccountant,
    orderClient,
    orderOperator,
    orderSA,
    routeRole
} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class Affair extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'affair'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "affair", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "Nomi"}
        ]
    }

    render() {
        const {openModal,dispatch,currentItem,affairList,deleteModal, page,size,totalElements, currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "affair", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "affair", type : 'delete'}))
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Xizmat turlari ro'yxati"} addModal={sModal}
                        openModal={openModal} search={(e) => dispatch(searchListFun(e,"affair"))} plus={orderSA(currentUser) || orderAccountant(currentUser)}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/affair`} >
                                        Xizmat turlari
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/order-affair`}>
                                        Xizmat ko'rsatish
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Ishchilar soni</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {affairList ? affairList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>{item.userList.length ?? ""}</td>
                                    <td>
                                        {!orderClient(currentUser) ?
                                            <Link to={`/${routeRole(currentUser)}/affair/${item.id}`}>
                                                <ViewButton />
                                            </Link> : ''
                                        }
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

Affair.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, page,size,totalElements,
             affairList
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, affairList, page,size,totalElements,currentUser
    })
)(Affair);