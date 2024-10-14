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
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {orderAccessorySeller, orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class Accessory extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'accessory'}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "accessory", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type : 'hidden', element: 'id'},
            {type : 'search', element: 'name', placeHolder : "Nomi"},
        ]
    }

    render() {
        const {openModal,dispatch,currentItem,accessoryList,deleteModal, page,size,totalElements,currentUser} = this.props

        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            dispatch(simpleAction(v, {cAPI : "accessory", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "accessory", type : 'delete'}))
        }
        return (
            <Container fluid className={"p-0 m-0"}>
                <Header title={"Aksessuar turi ro'yxati"} addModal={sModal} openModal={openModal} search={(e) => dispatch(searchListFun(e,"accessory"))} plus={orderSA(currentUser) || orderAccessorySeller(currentUser)}/>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Nav tabs  className={"bg-white"}>
                            <NavItem className={"tab-item-style-active"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory`} >
                                        Aksessuar
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory-income`}>
                                        Akssessuar olish
                                    </Link>
                                </NavLink>
                            </NavItem>
                            <NavItem className={"tab-item-style-default1"}>
                                <NavLink>
                                    <Link to={`/${routeRole(currentUser)}/accessory-shipment`}>
                                        Akssessuar sotish
                                    </Link>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Nomi</th>
                                <th>Soni</th>
                                <th>Sotilgan soni</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accessoryList ? accessoryList.map((item,i) =>
                                <tr key={item.id}>
                                    <td>{i+1}</td>
                                    <td>{item.name ?? ""}</td>
                                    <td>{item.count ?? ""}</td>
                                    <td>{item.quantitySold ?? ""}</td>
                                    <td>
                                        <EditButton fun={() => sModal(item)} />
                                        {orderSA(currentUser) === true ? <DeleteButton fun={() => dModal(item.id)} /> : ""}
                                    </td>
                                    {/*<Button onClick={()=>{dispatch(showHideImgModal(item,viewImageModal))}} className="bg-white mt-2" ><img src={eye} alt=""/></Button>*/}
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

Accessory.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, page,size,totalElements,totalPages,
             accessoryList
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, accessoryList, page,size,totalElements,totalPages, currentUser
    })
)(Accessory);