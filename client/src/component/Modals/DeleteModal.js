import React, {Component} from 'react';
import {Button, Modal, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import {showHideDeleteModal} from "./ModalFuncs";

class DeleteModal extends Component {
    render() {
        const {onSubmit, deleteModal,dispatch} = this.props;

        const hideModal = () => {
            dispatch(showHideDeleteModal(null, deleteModal))
        }
        return (
            <Modal isOpen={deleteModal} toggle={hideModal}>
                <h4 className={"title p-4"}>Rostdan ham o'chirasizmi?</h4>
                <ModalFooter className={"modal-footer mt-3"}>
                    <Button outline color="secondary" type={"button"} onClick={hideModal}>Bekor qilish</Button>
                    <Button color="danger" onClick={onSubmit}>O'chirish</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

DeleteModal.propTypes = {};

export default connect(
    ({
         app: {
             deleteModal
         },
         auth: {}
     }) => ({
        deleteModal
    })
)(DeleteModal);