import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {Button, Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import SimpleModal from "../../../component/Modals/SimpleModal";
import {showHideDeleteModal, showHideModal} from "../../../component/Modals/ModalFuncs";
import DeleteModal from "../../../component/Modals/DeleteModal";
import {checkStates} from "../../../utils/SecondaryFuncs/checkForm";
import {DeleteButton, EditButton} from "../../../component/CustomComponents/CustomButtons";
import {orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";

class TemplateOne extends Component {
    componentDidMount() {
        this.props.dispatch(getOneAction({api: 'template', id:this.props.identity}))
        console.clear()
    }

    state = {

    }

    render() {
        const {
            openModal,
            deleteModal,
            currentItem,
            currentObject,
            dispatch,page,size,totalElements,currentUser,
            templateOne
        } = this.props

        const sModal = (item) => {
            dispatch(showHideModal(item, openModal))
        }
        const dModal = (item) => {
            dispatch(showHideDeleteModal(item, deleteModal))
        }

        const saveItem = (e, v) => {
            if (v.id !== ""){
                checkStates(v,this.state,currentObject)
            }
            dispatch(simpleAction(v, {cAPI: "template", type: v.id !== '' ? "edit" : "save"}))
        }

        const deleteItem = () => {
            dispatch(simpleAction(currentItem, {cAPI: "template", type: 'delete'}))
        }

        console.log(templateOne)
        return (
            <div>
                <div className={"profile py-3"}>
                    <Container>
                        <Link to={`/${routeRole(currentUser)}/product`}>
                            <Button color={"outline-primary my-2"}>Ortga</Button>
                        </Link>
                    </Container>
                </div>

                <SimpleModal onSubmit={saveItem} state={this.state}/>

                <DeleteModal onSubmit={deleteItem}/>

            </div>
        );
    }
}

TemplateOne.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,templateOne,
             templateList, attachmentId, attachmentUrl, attachments, categoryList, brandList, page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,templateOne,
        templateList, attachmentId, attachmentUrl, attachments, categoryList, brandList, page,size,totalElements,totalPages, currentUser
    })
)(TemplateOne);
