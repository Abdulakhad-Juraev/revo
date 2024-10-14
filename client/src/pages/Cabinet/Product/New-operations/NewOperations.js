import React, {Component} from 'react';
import {connect} from "react-redux";
import {getListAction, simpleAction} from "../../../../redux/actionFuncs/mainActions";
import {Table} from "reactstrap";
import {Link} from "react-router-dom";
import {DeleteButton, ViewButton} from "../../../../component/CustomComponents/CustomButtons";
import {showHideDeleteModal} from "../../../../component/Modals/ModalFuncs";
import DeleteModal from "../../../../component/Modals/DeleteModal";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {nameOperation, orderSA, routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class NewOperations extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "new_operations"}))
    }

    render() {

        const {deleteModal, currentItem, operationList, dispatch, currentUser} = this.props

        const dModal = (item) =>{dispatch(showHideDeleteModal(item, deleteModal))}

        const deleteItem = () => {
            dispatch(simpleAction(currentItem.id ?? '',{cAPI : currentItem.type ?? '', type : 'delete'},false))
        }

        return (
            <div>
                <div className={"custom-res-div"}>
                    <div className={"custom-res-div2"}>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>shartnoma raqami</th>
                                <th>summa</th>
                                <th>vaqti</th>
                                <th>shartnoma tuzgan shaxs</th>
                                <th>Shartnoma turi</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {operationList ? operationList.map((item,i) =>
                                <tr key={i}>
                                    <th>{i+1}</th>
                                    <td>{item.id}</td>
                                    <td>{getNumberLLL(item.price)}</td>
                                    <td>{getDateLLL(item.date)}</td>
                                    <td><CustomTableTooltipUser user={item.user} /></td>
                                    <td>{nameOperation(item.type)}</td>
                                    <td>
                                        <Link to={`/${routeRole(currentUser)}/${item.type}/${item.id}`}>
                                            <ViewButton />
                                        </Link>
                                        {orderSA(currentUser) ? <DeleteButton fun={() => dModal(item)} /> : ''}
                                    </td>
                                </tr>
                            ) : ""}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <DeleteModal onSubmit={deleteItem} />
            </div>
        );
    }
}

NewOperations.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             operationList, attachmentId, attachmentUrl, viewImageModal
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        operationList, attachmentId, attachmentUrl, viewImageModal, currentUser
    })
)(NewOperations);