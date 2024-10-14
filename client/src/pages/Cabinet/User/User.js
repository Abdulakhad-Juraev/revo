import React, {Component} from 'react';
import {getListAction, getListByAction, simpleAction, simplePayAction} from "../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import SimpleModal from "../../../component/Modals/SimpleModal";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {Button, Modal, ModalFooter, Table, Row, Container, NavItem, NavLink, Nav} from "reactstrap";
import {
    nameRole,
    orderSA,
    orderAccountant,
    orderCashier,
    routeRole,
    orderS
} from "../../../utils/SecondaryFuncs/nameOfRole";
import Header from "../../../component/Header/Header";
import {
    CurrencyDollarButton,
    EditButton, MessageButton,
    PadlockButton,
    PlusButton, ViewButton
} from "../../../component/CustomComponents/CustomButtons";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";
import {AvForm, AvField, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import "./User.scss"

class User extends Component {
    componentDidMount() {
        // this.props.dispatch(getListAction({name: "user"}))
        this.props.dispatch(getListAction({name: "role"}))
        this.props.dispatch(getListAction({name: "regions"}))
        this.props.dispatch(getListByAction({name: "user", id: "user"}))
        console.clear()
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListByAction({
            name: "user",
            page: (pageNumber - 1),
            size: this.props.size,
            id: this.state.pageRole
        }))
    }

    state = {
        customForm: [
            {type: "hidden", element: "id"},
            {type: "text", element: "firstName", placeHolder: 'ism va Familiya'},
            {type: "text", element: "phone", placeHolder: 'telefon raqam'},
            {type: "single_select_role", element: "roleName", array: this.props.roleList},
        ],
        pswModal: false,
        user: {},
        payModal: false,
        payObj: {},
        salaryModal: false,
        salaryObj: {},
        pageRole: "user"
    }
    render() {

        const {
            dispatch,
            openModal,
            deleteModal,
            userList,
            currentItem,
            currentObject,
            page,
            size,
            totalElements,
            currentUser
        } = this.props

        const {user, pswModal, payModal, payObj, salaryModal, salaryObj, pageRole} = this.state


        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }

        const saveItem = (e, v) => {
            checkStates(v, this.state, currentObject)
            dispatch(simpleAction(v, {cAPI: "user", type: v.id !== '' ? "edit" : "save"}, false, false))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem, {cAPI: "user", type: 'patch'}))
        }

        const changePasswordModal = (user) => {
            this.setState({pswModal: !pswModal, user})
        }
        const changePsw = (e, v) => {
            if (v.id !== '') {
                dispatch(simpleAction(v, {cAPI: "user_pass", type: 'edit'}))
                this.setState({pswModal: !pswModal})
            }
        }


        const changePayModal = (id) => {
            this.setState({payModal: !payModal, payObj: {id: id}})
        }
        const payFun = (e, v) => {
            if (v.price !== "") {
                dispatch(simplePayAction(v, {cAPI: "payment"}, false))
            } else {
                toast.error("Summa kiritilmagan!")
            }
        }

        const changeSalaryModal = (item) => {
            this.setState({salaryModal: !salaryModal, salaryObj: item})
        }
        const salaryFun = (e, v) => {
            if (v.price !== "") {
                dispatch(simpleAction(v, {cAPI: "order_salary", type: 'save'}, true, false))
                changeSalaryModal(null)
            } else {
                toast.error("Summa kiritilmagan!")
            }
        }

        const smsToken = () => {
            dispatch(simpleAction(null, {cAPI: "sms", type: 'save'}, true, false))
        }

        const smsFun = (id) => {
            dispatch(simplePayAction({id : id}, {cAPI: "sms",}, false))
        }

        const setPageRole = (role) => {
            this.setState({pageRole: role})
            dispatch(getListByAction({name: "user", id: role}))
        }
        return (
            <div>
            <Container fluid className={"p-0 m-0"}>
                 <Header title={"Foydalanuvchilar ro'yxati"} addModal={sModal} openModal={openModal}
                        search={(e) => dispatch(searchListFun(e, "user"))}
                        plus={orderSA(currentUser) || orderAccountant(currentUser)}/>
                 <Row>
                    {orderS(currentUser) ? <Button color={"primary"} className={"px-5 m-3"} onClick={smsToken}>Sms tokenni yangilash</Button> : ''}
                 </Row>
             </Container>
            <div className={"res-div"}>
                <div className={"res-nav"}>
                <Nav tabs className={"bg-white w-100 nav-section"}>
                    {orderSA(currentUser) === true ?
                        <NavItem
                            className={pageRole === 'admin' ? "tab-item-style-active" : "tab-item-style-default1"}>
                            <NavLink onClick={() => setPageRole("admin")} className={"NavLink-hover"}>
                                Boshliq
                            </NavLink>
                        </NavItem> : ""
                    }
                    <NavItem
                        className={pageRole === 'moderator' ? "tab-item-style-active" : "tab-item-style-default1"}>
                        <NavLink onClick={() => setPageRole("moderator")} className={"NavLink-hover"}>
                            Moderator
                        </NavLink>
                    </NavItem>
                    <NavItem
                        className={pageRole === 'worker' ? "tab-item-style-active" : "tab-item-style-default1"}>
                        <NavLink onClick={() => setPageRole("worker")} className={"NavLink-hover"}>
                            Ishchi
                        </NavLink>
                    </NavItem>
                    <NavItem
                        className={pageRole === 'client' ? "tab-item-style-active" : "tab-item-style-default1"}>
                        <NavLink onClick={() => setPageRole("user")} className={"NavLink-hover"}>
                            Mijoz
                        </NavLink>
                    </NavItem>
                    <NavItem
                        className={pageRole === 'debt' ? "tab-item-style-active" : "tab-item-style-default1"}>
                        <NavLink onClick={() => setPageRole("debt")} className={"NavLink-hover"}>
                            Qarzdorlar
                        </NavLink>
                    </NavItem>

                </Nav>
            </div>
            <div className={"resp-div"}>
                <div className={"resp-div2"}>
                    <Table className={"table table-responsive-md bg-white"}>
                        <thead>
                        <tr>
                            <th>T/r</th>
                            <th>Ism, Familiya</th>
                            <th>Telefon Raqam</th>
                            <th>Oylik maosh</th>
                            <th>Pul miqdori</th>
                            <th>Lavozimi</th>
                            <th>Amal</th>
                            <th>To'lov</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList ? userList.map((item, i) =>
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.firstName !== null ? item.firstName : ''}</td>
                                <td>{item.phone ?? ''}</td>
                                <td>{getNumberLLL(item.salary ?? '')}</td>
                                <td>{getNumberLLL(item.money ?? '')}</td>
                                <td>{nameRole(item)}</td>
                                <td>
                                    {orderSA(currentUser) || orderCashier(currentUser) ? nameRole(item) !== "Klient " ?
                                        <PlusButton fun={() => changeSalaryModal(item)}/> : '' : ''}
                                    {orderSA(currentUser) || orderAccountant(currentUser) ?
                                        <PadlockButton fun={() => changePasswordModal(item)}/> : ''}
                                    {orderSA(currentUser) || orderAccountant(currentUser) ?
                                        <EditButton fun={() => sModal(item)}/> : ''}
                                    <Link to={`/${routeRole(currentUser)}/user/${item.id}`}>
                                        <ViewButton/>
                                    </Link>
                                </td>
                                <td>
                                    {orderSA(currentUser) || orderAccountant(currentUser) ?
                                        <MessageButton fun={() => smsFun(item.id)}/> : ""}
                                    {orderSA(currentUser) || orderCashier(currentUser) ?
                                        <CurrencyDollarButton fun={() => changePayModal(item.id)}/> : ''}
                                </td>
                            </tr>
                        ) : ""}
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
        </div>
                <SimpleModal onSubmit={saveItem} state={this.state}/>
                <DeleteModal onSubmit={deleteItem}/>


                <Modal isOpen={pswModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={changePsw}>
                        <h4 className={"title"}>Parol yangilash</h4>

                        <AvField type={"hidden"} name={"id"} defaultValue={user.id ?? ''}/>

                        <AvField type={"search"} name={"password"} label={"Parol"}/>

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changePasswordModal}>Bekor
                                qilish</Button>
                            <Button color="success" type={'submit'}>Yangilash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>


                <Modal isOpen={payModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={payFun}>
                        <h4 className={"title"}>To'lovni amalga oshirish</h4>

                        <AvField type={"hidden"} name={"id"} defaultValue={payObj.id ?? ''}/>

                        <AvField type={"search"} name={"price"} label={"Summa"} placeHolder={"Summa"}/>

                        <AvRadioGroup name="in" label="To'lov turi" inline>
                            <AvRadio customInput label="Mijozdan hisobidan pul o'chirish" value={false}/>
                            <AvRadio customInput label="Mijoz hisobiga pul qo'shish" value={true}/>
                        </AvRadioGroup>

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changePayModal}>
                                Bekor qilish
                            </Button>
                            <Button color="success" type={'submit'}>To'lov qilish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal isOpen={salaryModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={salaryFun}>
                        <h4 className={"title"}>Oylik to'lov</h4>
                        <h5 className={"form-control"}>Oylik summasi
                            -> {salaryObj && salaryObj.salary ? salaryObj.salary : ''}</h5>
                        <AvField type={"hidden"} name={"workerId"}
                                 defaultValue={salaryObj && salaryObj.id ? salaryObj.id : ''}/>

                        <AvField type={"number"} name={"price"} label={"Summa"} placeHolder={"Summa"}/>
                        <AvField type={"date"} name={"month"} label={"Sana"}/>

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changeSalaryModal}>Bekor
                                qilish</Button>
                            <Button color="success" type={'submit'}>To'lov qilish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

            </div>




        );
    }
}

User.propTypes = {};

export default connect(
    ({
         app: {
             regions,
             district,
             roleList,
             openModal,
             currentObject,
             currentItem,
             userList,
             deleteModal,
             page,
             size,
             totalElements,
             totalPages
         },
         auth: {isAdmin, isSuperAdmin, currentUser, loading}
     }) => ({
        regions,
        district,
        currentObject,
        currentItem,
        roleList,
        openModal,
        deleteModal,
        loading,
        isAdmin,
        isSuperAdmin,
        currentUser,
        userList,
        page, size, totalElements, totalPages
    })
)(User);
