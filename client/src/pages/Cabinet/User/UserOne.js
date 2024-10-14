import React, {Component} from 'react';
import {Button, Col, Container, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import "../Profil/Profil.scss"
import {imageRole, nameRole, routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {getListByAction} from "../../../redux/actionFuncs/mainActions";
import {getDateLLL, getMonthLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {MinusButton, PlusButton} from "../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import Pagination from "react-js-pagination";
import {getOneAction} from "../../../redux/actionFuncs/mainActions";
import {Link} from "react-router-dom";

class UserOne extends Component {

    componentDidMount() {
        this.props.dispatch(getOneAction({api : "userl" , id : this.props.identity}))
        this.props.dispatch(getListByAction({name : 'payment', id : this.props.identity}))
        this.props.dispatch(getListByAction({name : 'order_salary', id : this.props.identity}))
        console.clear()
    }

    handlePageChangePayment(pageNumber) {
        this.props.dispatch(getListByAction({name : "payment", id : this.props.identity, page: (pageNumber - 1), size: this.props.size}))
    }

    handlePageChangeSalary(pageNumber) {
        this.props.dispatch(getListByAction({name : "order_salary", id : this.props.identity, page: (pageNumber - 1), size: this.props.size}))
    }

    render() {

        const {userOne,paymentList, page,size,totalElements,salaryList, currentUser} = this.props

        return (
            <div className={"profile py-3"}>
                <Container>
                    <Link to={`/${routeRole(currentUser)}/user`}>
                        <Button color={"outline-primary my-2"}>Ortga</Button>
                    </Link>
                        <div className={"profile-user"}>
                        <Row>
                            <Col md={5}>
                                <div className={"profile-header text-center bg-white p-3"}>
                                    <img src={imageRole(userOne)} alt="" className={"rounded-circle my-3 profile-img"}/>
                                    <h4 className="mt-0">{`${userOne.firstName ?? ""}`}</h4>
                                    <p className="mb-0">
                                        Lavozim: {nameRole(userOne)}
                                    </p>
                                </div>
                                <div className={"bg-white profile-header my-4 p-3"}>
                                    <Row>
                                        <Col md={4}>
                                            <p>Telefon raqam:</p>
                                            <p>Pul miqdori:</p>
                                            <p>Oylik maosh:</p>
                                        </Col>
                                        <Col md={8}>
                                            <p>{userOne.phone}</p>
                                            <p>{getNumberLLL(userOne.money)} $</p>
                                            <p>{getNumberLLL(userOne.salary)}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={7}>
                                <div className={"bg-white profile-header p-3"}>
                                    <Row>
                                        <Col>
                                            <h4>Oylik to'lovlari</h4>
                                            <Table>
                                                <thead>
                                                <tr>
                                                    <th>Tr</th>
                                                    <th>Summa</th>
                                                    <th>Oy</th>
                                                    <th>Sana</th>
                                                    <th>Ishchi</th>
                                                    <th>Javobgar</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {salaryList ? salaryList.map((item) =>
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{getNumberLLL(item.price)}</td>
                                                        <td>{getMonthLLL(item.month)}</td>
                                                        <td>{getDateLLL(item.date)}</td>
                                                        <td><CustomTableTooltipUser user={item.worker} /></td>
                                                        <td><CustomTableTooltipUser user={item.user} /></td>
                                                    </tr>
                                                ) : ''}
                                                </tbody>
                                            </Table>
                                            <Pagination
                                                activePage={page + 1}
                                                itemsCountPerPage={size}
                                                totalItemsCount={totalElements}
                                                pageRangeDisplayed={5}
                                                onChange={this.handlePageChangePayment.bind(this)} itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className={"bg-white profile-header p-3 my-4"}>
                                    <Row>
                                        <Col>
                                            <h4>To'lovlar</h4>
                                            <Table className={"m-2 bg-white"}>
                                                <thead>
                                                <tr>
                                                    <th>Tr</th>
                                                    <th>Summa</th>
                                                    <th>Sana</th>
                                                    <th>Holat</th>
                                                    <th>Mijoz</th>
                                                    <th>Javobgar</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {paymentList ? paymentList.map((item, i) =>
                                                    <tr key={i+1}>
                                                        <td>{i+1}</td>
                                                        <td>{(item.in ? " " : "- ") + getNumberLLL(item.price)}</td>
                                                        <td>{getDateLLL(item.date)}</td>
                                                        <td>{item.in ? <PlusButton /> : <MinusButton />}</td>
                                                        <td><CustomTableTooltipUser user={item.client} /></td>
                                                        <td><CustomTableTooltipUser user={item.user} /></td>
                                                    </tr>
                                                ) : ''}
                                                </tbody>
                                            </Table>
                                            <Pagination
                                                activePage={page + 1}
                                                itemsCountPerPage={size}
                                                totalItemsCount={totalElements}
                                                pageRangeDisplayed={5}
                                                onChange={this.handlePageChangePayment.bind(this)} itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default connect(
    ({
         app: {
             loading,attachmentUrl, paymentList,salaryList,
             page,size,totalElements,totalPages,userOne
         },
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl, paymentList,salaryList,
        page,size,totalElements,totalPages,userOne
    })
)(UserOne);
