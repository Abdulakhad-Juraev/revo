import React, {Component} from 'react';
import {connect} from "react-redux";
import {getOneAction} from "../../../../redux/actionFuncs/mainActions";
import {Col, Row, Container, Table} from "reactstrap";
import {acceptAction} from "../../../../redux/actions/AppActions";
import {Link} from "react-router-dom";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import {CheckButton, CloseButton} from "../../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../../component/CustomComponents/CustomTableTooltipUser";
import {routeRole} from "../../../../utils/SecondaryFuncs/nameOfRole";

class IncomeOne extends Component {
    componentDidMount() {
        this.props.dispatch(getOneAction({api : "income" , id : this.props.identity}))
        console.clear()
    }


    render() {

        const {incomeOne,currentUser} = this.props



        // const acceptFunc = () => {
        //     dispatch(acceptAction({api : "income", id : this.props.identity}))
        // }

        return (
            incomeOne !== null ?
                <div>
                    <Container fluid className={"pt-4"}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col md={11}>
                                        <h5>Shartnoma : {incomeOne.id ?? ''}</h5>
                                    </Col>
                                    <Col md={1} className={"text-right"}>
                                        <Link to={`/${routeRole(currentUser)}/income`}>
                                            <CloseButton />
                                        </Link>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col>
                                        <span>Shartnoma raqami</span>
                                        <h4 className={"form-control"}>{incomeOne.id}</h4>
                                        <br/>
                                        <span>Shartnoma vaqti</span>
                                        <h4 className={"form-control"}>{getDateLLL(incomeOne.date)}</h4>
                                        <br/>
                                    </Col>

                                    <Col>
                                        <Row>
                                            <Col>
                                                <span>Javobgar shaxs</span>
                                                <h4 className={"form-control"}><CustomTableTooltipUser
                                                    user={incomeOne.user ?? null}/></h4>
                                            </Col>
                                            <Col>
                                                <span>Mijoz</span>
                                                <h4 className={"form-control"}><CustomTableTooltipUser
                                                    user={incomeOne.client ?? null}/></h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <span>Jami summa</span>
                                                <h4 className={"form-control"}>{getNumberLLL(incomeOne.price)}</h4>
                                            </Col>
                                            <Col md={6}>
                                                <span>Jami summa ($ hisobida)</span>
                                                <h4 className={"form-control"}>{getNumberLLL(incomeOne.priceD)}</h4>
                                            </Col>
                                        </Row>
                                        <br/>
                                    </Col>
                                </Row>
                                <br />
                                <div className={"custom-res-div"}>
                                    <div className={"custom-res-div2"}>
                                        <Table className={"bg-white"}>
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Mahsulot </th>
                                                <th colSpan={2} className={"text-center"}>Holat</th>
                                                <th>Narx</th>
                                                <th>O'lcham</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {incomeOne.productList ? incomeOne.productList.map((item, i) =>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{`${item.template.name ?? ''}`}</td>
                                                    <td>{item.absolute ? "Butun" : "Qoldiq"}</td>
                                                    <td>{item.endItem ? <span className={"text-danger"}>Tugagan</span> : "Mavjud"}</td>
                                                    <td>{getNumberLLL(item.price)}</td>
                                                    <td>{getNumberLLL(item.size)}</td>
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
             attachmentId, attachmentUrl, viewImageModal,incomeOne
         },
         auth: {currentUser}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,
        attachmentId, attachmentUrl, viewImageModal,incomeOne, currentUser
    })
)(IncomeOne);