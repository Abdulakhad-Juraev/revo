import React, {Component} from 'react';
import {Row, Col, Input} from "reactstrap";
import {connect} from "react-redux";
import {deleteFileAction, uploadFileAction, uploadMultiFileAction} from "../../redux/actions/AppActions";
import {AvField} from "availity-reactstrap-validation";
import deleteIcon from "../../resources/outline/trash.svg";

class CustomFileInput extends Component {
    render() {
        const {attachmentId, attachmentUrl,attachments,dispatch,object,multi} = this.props

        const uploadImg = (e) => {
            dispatch(uploadFileAction(e.target.files[0]))
        }

        const uploadMulti = (e) => {
            dispatch(uploadMultiFileAction(e.target.files[0]))
        }

        const deleteImg = (id,index) => {
            let array = [...attachments]
            array.splice(index,1)
            dispatch(deleteFileAction(id,array))
        }

        return (
            multi ?
                <Row>
                    <Input type={"file"} onChange={uploadMulti} label={"File yuklang"} />
                    {attachments ? attachments.map((item,i) =>
                        <Col md={4}>
                            <img src={deleteIcon} onClick={() => deleteImg(item,i)} alt={"delete"}/>
                            <img key={i} src={attachmentUrl + item} className="img-thumbnail w-100" alt={""}/>
                        </Col>
                    ) : ''}
                </Row>
            :
                <div>
                    <Input type={"file"} onChange={uploadImg}/>
                    {object && object.attachment && object.attachment.id ?
                        <img src={attachmentUrl + object.attachment.id} className={"img-thumbnail"} alt={""} />
                        :
                        attachmentId ?
                            <img src={attachmentUrl + attachmentId} className={"img-thumbnail"} alt={""} />
                            : ''
                    }
                    <AvField type={'hidden'} name={'attachmentId'} value={attachmentId ?? null} />
                </div>
        );
    }
}

CustomFileInput.propTypes = {};

export default connect(
    ({
         app: {
             attachmentId, attachmentUrl, attachments
         },
         auth: {}
     }) => ({
        attachmentId, attachmentUrl, attachments
    })
)(CustomFileInput)