import React, {Component} from 'react';
import {getListAction, simpleAction, simplePayAction} from "../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import SimpleModal from "../../../component/Modals/SimpleModal";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import {Button, Modal, ModalFooter, Table, Col, Row, Container} from "reactstrap";
import {nameRole, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import Header from "../../../component/Header/Header";
import {
    CheckButton,
    DeleteButton,
    EditButton,
    MinusButton,
    PlusButton, ViewButton
} from "../../../component/CustomComponents/CustomButtons";
import DeleteModal from "../../../component/Modals/DeleteModal";
import Pagination from "react-js-pagination";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";
import {searchListFun} from "../../../redux/actionFuncs/inputFuncs";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

class User extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: "role"}))
        this.props.dispatch(getListAction({name: "user_debt"}))
        console.clear()
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "user_debt", page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        customForm : [
            {type: "hidden", element: "id"},
            {type: "text", element: "firstName", placeHolder : 'ism'},
            {type: "text", element: "lastName", placeHolder : 'familiya'},
            {type: "text", element: "phone", placeHolder : 'telefon raqam'},
            {type: "number", element: "salary", placeHolder : 'Oylik maosh'},
            {type: "single_select_role", element : "roleName", array : this.props.roleList}
        ],
        pswModal : false,
        user : {},
        payModal : false,
        payObj : {},
        salaryModal : false,
        salaryObj : {},
    }
    render() {

        const {dispatch,openModal,deleteModal, userList, currentItem,currentObject, page,size,totalElements, currentUser} = this.props

        const {user,pswModal,payModal,payObj,salaryModal,salaryObj} = this.state


        const sModal = (item) => {dispatch(showHideModal(item, openModal))}
        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const saveItem = (e,v) => {
            checkStates(v,this.state,currentObject)
            dispatch(simpleAction(v,{cAPI : "user",  type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem,{cAPI : "user", type : 'patch'}))
        }

        const changePasswordModal = (user) => {
            this.setState({pswModal : !pswModal, user})
        }
        const changePsw = (e,v) => {
            if (v.id !== ''){
                dispatch(simpleAction(v,{cAPI : "user_pass", type : 'edit'}))
                this.setState({pswModal : !pswModal})
            }
        }


        const changePayModal = (id, isIn) => {
            this.setState({payModal : !payModal, payObj: {id : id, in : isIn}})
        }
        const payFun = (e,v) => {
            if (v.price !== "") {
                dispatch(simplePayAction(v,{cAPI :"payment"},false))
            }else {
                toast.error("Summa kiritilmagan!")
            }
        }

        const changeSalaryModal = (item) => {
            this.setState({salaryModal : !salaryModal, salaryObj: item})
        }
        const salaryFun = (e,v) => {
            if (v.price !== "") {
                dispatch(simpleAction(v,{cAPI :"order_salary", type : 'save'},true,false))
                changeSalaryModal(null)
            }else {
                toast.error("Summa kiritilmagan!")
            }
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Qarzdorlar ro'yxati"} addModal={sModal} openModal={openModal} search={(e) => dispatch(searchListFun(e,"user"))} plus={true}/>
                <div className={"res-div"}>
                    <Row>
                    <Col md={2}>
                        <Link to={`/${routeRole(currentUser)}/user`}>
                            <Button color={"outline-primary"} className={"w-100"}>Foydalanuvchilar</Button>
                        </Link>
                    </Col>
                    <Col md={2}>
                        <Link to={`/${routeRole(currentUser)}/user-debt`}>
                            <Button color={"outline-primary"}>Qarzdorlar</Button>
                        </Link>
                    </Col>
                </Row>
                    <Table className={"bg-white"}>
                    <thead>
                    <tr>
                        <th>T/r</th>
                        <th>Ism, Familiya</th>
                        <th>Telefon Raqam</th>
                        <th>Oylik maosh</th>
                        <th>Summa</th>
                        <th>Lavozimi</th>
                        <th>Amal</th>
                        <th>To'lov</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList ? userList.map((item, i) =>
                        <tr key={item.id}>
                            <td>{i+1}</td>
                            <td>{(item.firstName !== null ? item.firstName : '') + " " + (item.lastName !== null ? item.lastName : '')}</td>
                            <td>{item.phone ?? ''}</td>
                            <td>{item.salary ?? ''}</td>
                            <td>{item.money ?? ''}</td>
                            <td>
                                {nameRole(item)}
                            </td>
                            <td>
                                {nameRole(item) !== "Klient " ? <PlusButton fun={() => changeSalaryModal(item)} /> : ''}
                                <CheckButton fun={() => changePasswordModal(item)} />
                                <EditButton fun={() => sModal(item)} />
                                <DeleteButton fun={() => dModal(item.id)} />
                                <Link to={`/${routeRole(currentUser)}/user/${item.id}`}>
                                    <ViewButton />
                                </Link>
                            </td>
                            <td>
                                <MinusButton fun={() => changePayModal(item.id,false)} />
                                <PlusButton fun={() => changePayModal(item.id,true)}/>
                            </td>
                        </tr>
                    ) : ""}
                    </tbody>
                </Table>

                    <Pagination
                        activePage={page + 1}
                        itemsCountPerPage={size}
                        totalItemsCount={totalElements}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>

                <SimpleModal onSubmit={saveItem} state={this.state} />
                <DeleteModal onSubmit={deleteItem} />


                <Modal isOpen={pswModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={changePsw}>
                        <h4 className={"title"}>Parol yangilash</h4>

                        <AvField type={"hidden"} name={"id"} defaultValue={user.id ?? ''}/>

                        <AvField type={"search"} name={"password"} label={"Parol"}/>

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changePasswordModal}>Bekor qilish</Button>
                            <Button color="success" type={'submit'}>Yangilash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>


                <Modal isOpen={payModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={payFun}>
                        <h4 className={"title"}>To'lovni amalga oshirish</h4>

                        <AvField type={"hidden"} name={"id"} defaultValue={payObj.id ?? ''}/>

                        <AvField type={"search"} name={"price"} label={"Summa"} placeHolder={"Summa"}/>

                        <AvField type={"checkbox"} name={"in"} label={payObj.in ?  "Chiquvchi" : "Kiruvchi"} defaultChecked={payObj.in} disabled/>

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changePayModal}>Bekor qilish</Button>
                            <Button color="success" type={'submit'}>To'lov qilish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal isOpen={salaryModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={salaryFun}>
                        <h4 className={"title"}>Oylik to'lov</h4>

                        <h5 className={"form-control"}>Oylik summasi -> {salaryObj.salary ?? ''}</h5>
                        <AvField type={"hidden"} name={"workerId"} defaultValue={salaryObj.id ?? ''}/>

                        <AvField type={"number"} name={"price"} label={"Summa"} placeHolder={"Summa"}/>
                        <AvField type={"date"} name={"month"} label={"Sana"} />

                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={changeSalaryModal}>Bekor qilish</Button>
                            <Button color="success" type={'submit'}>To'lov qilish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>


            </Container>
        );
    }
}

User.propTypes = {};

export default connect(
    ({
         app: {roleList,openModal,currentObject,currentItem, userList, deleteModal, page,size,totalElements,totalPages},
         auth: {isAdmin, isSuperAdmin, currentUser, loading}
     }) => ({
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
        page,size,totalElements,totalPages
    })
)(User);
