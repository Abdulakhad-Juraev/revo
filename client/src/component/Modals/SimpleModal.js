import React, {Component} from 'react';
import {Button, Modal, ModalFooter} from "reactstrap";
import {CustomForm} from "../CustomComponents/CustomForm";
import {connect} from "react-redux";
import {showHideModal} from "./ModalFuncs";
import {AvForm} from "availity-reactstrap-validation";

class SimpleModal extends Component {
    render() {
        const {state,currentObject, onSubmit, openModal, dispatch} = this.props;

        const hideModal = () => {
            dispatch(showHideModal(null, openModal))
        }


        return (
            <Modal isOpen={openModal}>
                <AvForm className={"col-12 p-5"} onValidSubmit={onSubmit}>
                    <h4 className={"title"}>{!(currentObject && currentObject.id) ? "Qo'shish" : "Tahrirlash"}</h4>

                    <CustomForm state={state} dispatch={dispatch} object={currentObject}/>

                    <ModalFooter className={"modal-footer mt-3"}>
                        <Button outline color="secondary" type={"button"} onClick={hideModal}>Bekor qilish</Button>
                        <Button color="success" type={'submit'}>{!(currentObject && currentObject.id) ? "Qo'shish" : "Tahrirlash"}</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

SimpleModal.propTypes = {};
export default connect(
    ({
         app: {
             openModal,currentObject
         },
         auth: {}
     }) => ({
        openModal,currentObject
    })
)(SimpleModal);
