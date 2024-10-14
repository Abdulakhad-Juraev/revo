import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction} from "../../../../redux/actionFuncs/mainActions";
import {Button, Col, Container, Modal, ModalFooter, Row, Table} from "reactstrap";
import {AvForm} from "availity-reactstrap-validation";
import {acceptAction} from "../../../../redux/actions/AppActions";
import {CheckButton, CloseButton, ViewButton} from "../../../../component/CustomComponents/CustomButtons";
import {Link} from "react-router-dom";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class ShipmentOne extends Component {

    componentDidMount() {

        this.props.dispatch(getOneAction({api: "shipment", id: this.props.identity}))
        console.clear()
    }

    state = {
        products: []
    }

    render() {

        const {openModal, shipmentOne, dispatch, currentUser} = this.props
        const {products} = this.state

        console.log(shipmentOne)


        const acceptFunc = () => {
            dispatch(acceptAction({api: "accept_shipment", id: this.props.identity}))
        }


        console.log(shipmentOne)
        return (
            <div>
                <Container fluid className={"pt-4"}>
                    <Row>
                        <Col>
                            <Row>
                                <Col md={11}>
                                    <h5>Shartnoma : {shipmentOne.id ?? ''}</h5>
                                </Col>
                                <Col md={1} className={"text-right"}>
                                    <Link to={`/${routeRole(currentUser)}/shipment`}>
                                        <CloseButton/>
                                    </Link>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <span>Shartnoma raqami</span>
                                    <h4 className={"form-control"}>{shipmentOne.id}</h4>
                                    <br/>
                                    <span>Shartnoma vaqti</span>
                                    <h4 className={"form-control"}>{getDateLLL(shipmentOne.date)}</h4>

                                </Col>

                                <Col>
                                    <Row>
                                        <Col>
                                            <span>Javobgar shaxs</span>
                                            <h4 className={"form-control"}><CustomTableTooltipUser
                                                user={shipmentOne.user ?? null}/></h4>
                                        </Col>
                                        <Col>
                                            <span>Mijoz</span>
                                            <h4 className={"form-control"}><CustomTableTooltipUser
                                                user={shipmentOne.client ?? null}/></h4>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col md={6}>
                                            <span>Jami summa</span>
                                            <h4 className={"form-control"}>{getNumberLLL(shipmentOne.price)}</h4>
                                        </Col>
                                        <Col md={6}>
                                            <span>Jami summa ($ hisobida)</span>
                                            <h4 className={"form-control"}>{getNumberLLL(shipmentOne.priceD)}</h4>
                                        </Col>
                                    </Row>
                                    <br/>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={"custom-res-div"}>
                                        <div className={"custom-res-div2"}>
                                            <Table className={"mt-3 bg-white"}>
                                                <thead>
                                                <tr>
                                                    <th>Tr</th>
                                                    <th>Namuna</th>
                                                    <th>1 kv/m Narxi</th>
                                                    <th>Oyna o'lchami</th>
                                                    <th>Soni</th>
                                                    <th>Summa</th>
                                                    <th>Sana</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {shipmentOne.orderList ? shipmentOne.orderList.map((item, i) =>
                                                    <tr key={item.id}>
                                                        <th>{i + 1}</th>
                                                        <td>{item.template.name ?? ''}</td>
                                                        <td>{getNumberLLL(item.template.price ?? '')}</td>
                                                        <td>{item.absolute ? "Butun" : `${item.width} x ${item.height}, ${item.size} kv/m`}</td>
                                                        <td>{item.count ?? ''}</td>
                                                        <td>{item.price * item.size * item.count ?? ''}</td>
                                                        <td>{getDateLLL(item.date)}</td>
                                                    </tr>
                                                ) : ''}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                    </Row>

                </Container>

            </div>
        );
    }
}

ShipmentOne.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, shipmentOne
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal, shipmentOne, currentUser
    })
)(ShipmentOne);