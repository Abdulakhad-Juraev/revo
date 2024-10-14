import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction} from "../../../../redux/actionFuncs/mainActions";
import {Col, Container, Row, Table} from "reactstrap";
import {CheckButton, CloseButton} from "../../../../component/CustomComponents/CustomButtons";
import {Link} from "react-router-dom";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class ShipmentOne extends Component {

    componentDidMount() {
        this.props.dispatch(getOneAction({api : "accessory_shipment" , id : this.props.identity}))
        console.clear()
    }

    render() {

        const {accessoryShipmentOne, currentUser} = this.props


        return (
            <div>
                    <Container fluid className={"pt-4 mr-5"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col md={11}>
                                        <Row>
                                            <Col>
                                                <h5>Shartnoma : {accessoryShipmentOne.id ?? ''}</h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1} className={"text-right"}>
                                        <Link to={`/${routeRole(currentUser)}/accessory-shipment`}>
                                            <CloseButton />
                                        </Link>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col md={6}>
                                                <span>Shartnoma raqami</span>
                                                <h4 className={"form-control"}>{accessoryShipmentOne.id}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Shartnoma vaqti</span>
                                                <h4 className={"form-control"}>{getDateLLL(accessoryShipmentOne.date)}</h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <span>Jami summa</span>
                                                <h4 className={"form-control"}>{getNumberLLL(accessoryShipmentOne.price)}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Jami summa ($)</span>
                                                <h4 className={"form-control"}>{getNumberLLL(accessoryShipmentOne.priceD)}</h4>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col>
                                        <span>Javobgar shaxs</span>
                                        <h4 className={"form-control"}><CustomTableTooltipUser user={accessoryShipmentOne.user??null}/></h4>
                                        <br/>
                                        <span>Mijoz</span>
                                        <h4 className={"form-control"}><CustomTableTooltipUser user={accessoryShipmentOne.client??null}/></h4>
                                        <br/>
                                        <Row>
                                        </Row>
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
                                                        <th>Aksessuar </th>
                                                        <th>Soni</th>
                                                        <th>Narxi</th>
                                                        <th>Summa</th>
                                                        <th>Sana</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {accessoryShipmentOne.orderAccessoryList ? accessoryShipmentOne.orderAccessoryList.map((item,i) =>
                                                        <tr key={item.id}>
                                                            <th>{i+1}</th>
                                                            <td>{item.accessory ? item.accessory.name : ""}</td>
                                                            <td>{item.count ?? ''}</td>
                                                            <td>{getNumberLLL(item.price ?? '')}</td>
                                                            <td>{(item.price * item.count) ?? ''}</td>
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
             attachmentId, attachmentUrl, viewImageModal,accessoryShipmentOne
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal,accessoryShipmentOne, currentUser
    })
)(ShipmentOne);