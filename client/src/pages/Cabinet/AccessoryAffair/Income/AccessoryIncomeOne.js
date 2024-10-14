import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction} from "../../../../redux/actionFuncs/mainActions";
import {Col, Row, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import {CheckButton, CloseButton} from "../../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class IncomeOne extends Component {
    componentDidMount() {
        this.props.dispatch(getOneAction({api : "accessory_income" , id : this.props.identity}))
        console.clear()
    }


    render() {

        const {accessoryIncomeOne, currentUser} = this.props


        return (
            accessoryIncomeOne !== null ?
                <div>
                    <Container fluid className={"pt-4 mr-5"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col md={11}>
                                        <Row>
                                            <Col>
                                                <h5>Shartnoma : {accessoryIncomeOne.id ?? ''}</h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1} className={"text-right"}>
                                        <Link to={`/${routeRole(currentUser)}/accessory-income`}>
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
                                                <h4 className={"form-control"}>{accessoryIncomeOne.id}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Shartnoma vaqti</span>
                                                <h4 className={"form-control"}>{getDateLLL(accessoryIncomeOne.date)}</h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <span>Jami summa</span>
                                                <h4 className={"form-control"}>{getNumberLLL(accessoryIncomeOne.price)}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Jami summa ($ hisobida)</span>
                                                <h4 className={"form-control"}>{getNumberLLL(accessoryIncomeOne.priceD)}</h4>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col>
                                        <span>Javobgar shaxs</span>
                                        <h4 className={"form-control"}><CustomTableTooltipUser user={accessoryIncomeOne.user??null}/></h4>
                                        <br/>
                                        <span>Mijoz</span>
                                        <h4 className={"form-control"}><CustomTableTooltipUser user={accessoryIncomeOne.client??null}/></h4>
                                        <br/>
                                        <Row>

                                        </Row>
                                    </Col>
                                </Row>
                                <br />
                                <div className={"custom-res-div"}>
                                    <div className={"custom-res-div2"}>
                                        <Table className={"bg-white"}>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Aksessuar </th>
                                                <th>Soni</th>
                                                <th>Narx</th>
                                                <th>Summa</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {accessoryIncomeOne.orderAccessoryList ? accessoryIncomeOne.orderAccessoryList.map((item, i) =>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{item.accessory ? item.accessory.name : ""}</td>
                                                    <td>{item.count}</td>
                                                    <td>{getNumberLLL(item.price)}</td>
                                                    <td>{item.count * item.price}</td>
                                                </tr>
                                            ) : ''}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>

                </div>
                : ''
        );
    }
}

IncomeOne.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal,accessoryIncomeOne
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal,accessoryIncomeOne, currentUser
    })
)(IncomeOne);