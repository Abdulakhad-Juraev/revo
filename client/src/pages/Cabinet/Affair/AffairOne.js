import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, getOneAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import Header from "../../../component/Header/Header";
import {Button, Container, Modal, ModalFooter, Table} from "reactstrap";
import Select from "react-select";
import {AvForm} from "availity-reactstrap-validation";
import {DeleteButton} from "../../../component/CustomComponents/CustomButtons";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class AffairOne extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name : 'worker'}))
        this.props.dispatch(getOneAction({api : 'affair', id : this.props.identity}))
        console.clear()
    }

    state = {
        userId : '',
        isRemove : false,
    }

    render() {
        const {openModal,deleteModal, dispatch, affairOne, workerListSelect, identity,currentUser} = this.props
        const {userId, isRemove} = this.state


        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
            this.setState({isRemove: false})
        }

        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
            this.setState({isRemove: true, userId: item})
        }

        const getUser = (e) => {
            this.setState({userId: e.value})
        }

        const saveItem = (e,v) => {
            v.affairId = identity
            v.userId = userId
            v.remove = isRemove
            dispatch(simpleAction(v,{cAPI : "section_member",  type: "save"},false,false))
        }

        const deleteItem = () => {
            let v = {affairId: identity, userId: userId, remove: isRemove}
            dispatch(simpleAction(v,{cAPI : "section_member",  type: "save"},false,false))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={`Xizmat turi : ${affairOne.name ?? ''}`} addModal={sModal} openModal={openModal} plus={true}/>
                <Link to={`/${routeRole(currentUser)}/affair`} className={"ml-2"}>
                    <Button color={"outline-primary my-2"}>Ortga</Button>
                </Link>

                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Ism/Familiya</th>
                                <th>Telefon raqam</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {affairOne && affairOne.userList ? affairOne.userList.map((item,i) =>
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{`${item.firstName ?? ''}  ${item.lastName ?? ''}`}</td>
                                    <td>{item.phone ?? ''}</td>
                                    <td>
                                        <DeleteButton fun={() => dModal(item.id)} />
                                    </td>
                                </tr>
                            ) :<tr><td colSpan={4} className={"text-center"}><h5>Ma'lumot mavjud emas!</h5></td></tr>}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <Modal isOpen={openModal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={saveItem}>
                        <h4 className={"title"}>Bo'limga ishchi qo'shish</h4>
                        <Select
                            placeholder={"Ishchi tanlang"}
                            isSearchable={true}
                            options={workerListSelect}
                            onChange = {getUser}
                        />
                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={sModal}>Bekor qilish</Button>
                            <Button color="success" type={'submit'}>Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <DeleteModal onSubmit={deleteItem} />

            </Container>
        );
    }
}

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, affairOne, workerListSelect
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, affairOne, workerListSelect,currentUser
    })
)(AffairOne);