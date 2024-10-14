import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction} from "../../../redux/actionFuncs/mainActions";
import {Col, Row, Container, Table, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {CheckButton, CloseButton} from "../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import {acceptAction} from "../../../redux/actions/AppActions";
import {orderOperator, orderSA, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";

class OrderAffairOne extends Component {
    componentDidMount() {
        this.props.dispatch(getOneAction({api: "order_affair", id: this.props.identity}))
        console.clear()
    }


    render() {

        const {dispatch, orderAffairOne, currentUser} = this.props

        const acceptFunc = () => {
            dispatch(acceptAction({api: "accept_order_affair", id: this.props.identity}))
        }

        const readyFunc = () => {
            dispatch(acceptAction({api: "ready_order_affair", id: this.props.identity}))
        }


        return (
            orderAffairOne !== null ?
                <div className={"res-div"}>
                    <Container fluid className={"pt-4"}>
                        <Row>
                            <Col>
                                <Row className={"my-5"}>
                                    <Col>
                                        {orderSA(currentUser) || orderOperator(currentUser) ?
                                            orderAffairOne.ready ? "" :
                                                <Button color={"outline-success"} onClick={readyFunc}>Buyurtmani tayyorlash</Button>
                                            : ''
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={11}>
                                        <Row>
                                            <Col md={2}>
                                                <h5>Shartnoma : {orderAffairOne.id ?? ''}</h5>
                                            </Col>
                                            <Col md={7}/>
                                            <Col>
                                                {orderAffairOne.ready ?
                                                    <h5 className='text-success'>Xizmat yakunlangan</h5>
                                                    :
                                                    <h5 className='text-danger'>Xizmat yakunlanmagan</h5>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1} className={"text-right"}>
                                        <Link to={`/${routeRole(currentUser)}/order-affair`}>
                                            <CloseButton/>
                                        </Link>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col md={6}>
                                                <span>Shartnoma raqami</span>
                                                <h4 className={"form-control"}>{orderAffairOne.id}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Shartnoma vaqti</span>
                                                <h4 className={"form-control"}>{getDateLLL(orderAffairOne.date)}</h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <span>Holat</span>
                                                <h4 className={"form-control"}>{orderAffairOne.accepted ? "Tayyor" : "Ish jarayonida"}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <Row>
                                                    <Col md={6}>
                                                        <span>Summa</span>
                                                        <h4 className={"form-control"}>{getNumberLLL(orderAffairOne.price)}</h4>
                                                    </Col>
                                                    <Col md={6}>
                                                        <span>Summa ($ hisobida)</span>
                                                        <h4 className={"form-control"}>{getNumberLLL(orderAffairOne.priceD)}</h4>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/>
                                    </Col>

                                    <Col>
                                        <Row>
                                            <Col md={6}>
                                                <span>Javobgar shaxs</span>
                                                <h4 className={"form-control"}><CustomTableTooltipUser
                                                    user={orderAffairOne.user ?? null}/></h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Mijoz</span>
                                                <h4 className={"form-control"}><CustomTableTooltipUser
                                                    user={orderAffairOne.client ?? null}/></h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <span>Tayyorlangan sana</span>
                                                <h4 className={"form-control"}>{getDateLLL(orderAffairOne.readyDate)}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Tayyorlagan shaxs</span>
                                                <h4 className={"form-control"}><CustomTableTooltipUser
                                                    user={orderAffairOne.readyUser ?? null}/></h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                    </Col>
                                </Row>
                                <br/>

                                <Table className={"bg-white"}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Xizmat</th>
                                        <th>1 o'lchov uchun narx</th>
                                        <th>o'lchov</th>
                                        <th>Summa</th>
                                        <th>Izoh</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderAffairOne.affairList ? orderAffairOne.affairList.map((item, i) =>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.affair.name ?? ''}</td>
                                            <td>{getNumberLLL(item.price)}</td>
                                            <td>{item.count}</td>
                                            <td>{getNumberLLL(item.count * item.price)}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ) : ''}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Container>

                </div>
                : ''
        );
    }
}


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, orderAffairOne
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal, orderAffairOne, currentUser
    })
)(OrderAffairOne);