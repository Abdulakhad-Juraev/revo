import React, {Component} from 'react';
import {AvForm} from "availity-reactstrap-validation";
import {Button, Modal, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import {showHideImgModal} from "./ModalFuncs";

class ImgModal extends Component {
    render() {
        const {attachmentUrl, viewImageModal,viewImage,dispatch} = this.props

        return (
            <Modal isOpen={viewImageModal}>
                <AvForm className={"col-12 p-5"}>
                    <h4 className={"title"}>View</h4>
                    {viewImage ? <img src={attachmentUrl + viewImage} alt="" className="img-thumbnail w-100"/> : ''}
                    <ModalFooter className={"modal-footer mt-3"}>
                        <Button outline color="secondary" type={"button"} onClick={()=>{dispatch(showHideImgModal(null,viewImageModal))}}>Bekor qilish</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        );
    }
}

ImgModal.propTypes = {};


export default connect(
    ({
         app: {loading,attachmentUrl,viewImageModal, viewImage},
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl,viewImageModal,viewImage
    })
)(ImgModal);
