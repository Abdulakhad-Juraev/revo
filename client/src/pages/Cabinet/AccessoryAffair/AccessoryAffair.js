import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import SimpleModal from "../../../component/Modals/SimpleModal";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {orderSA, orderSAMW, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class AccessoryAffair extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'accessory'}))
        this.props.dispatch(getListAction({name: 'accessory_affair'}))
        this.props.dispatch(getListAction({name: 'client'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "accessory_affair", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : "select", element: "accessory", array : this.props.accessoryList},
            {type : 'search', element: 'count', placeHolder : "Soni"},
            {type : "select_user", element: "client", array : this.props.clientList}
        ]
    }

    render() {
        const {openModal,dispatch,currentItem,accessoryAffairList,deleteModal, page,size,totalElements, course, currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "accessory_affair", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "accessory_affair", type : 'delete'}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Aksessuar sotuvi ro'yxati"} addModal={sModal} openModal={openModal} plus={orderSAMW(currentUser)}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-default"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory`} >
                                        Aksessuarlar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory-affair`}>
                                        Akssessuar xizmati
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Mahsulot</th>
                                <th>Soni</th>
                                <th>Summa</th>
                                <th>Javobgar shaxs</th>
                                <th>Mijoz</th>
                                <th>Sana</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accessoryAffairList ? accessoryAffairList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.accessory.name ?? ""}</td>
                                    <td>{item.count ?? ""}</td>
                                    <td>{getNumberLLL(item.price ?? "")} ({getNumberLLL(item.price? item.price / course.value : "")}$)</td>
                                    <td><CustomTableTooltipUser user={item.user} /></td>
                                    <td><CustomTableTooltipUser user={item.client} /></td>
                                    <td>{getDateLLL(item.date)}</td>
                                    <td>
                                        {orderSAMW(currentUser) === true ? <EditButton fun={() => sModal(item)} /> : ""}
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

AccessoryAffair.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, page,size,totalElements,
             accessoryList,accessoryAffairList,clientList, course
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, accessoryList, accessoryAffairList,
        page,size,totalElements,clientList, course, currentUser
    })
)(AccessoryAffair);