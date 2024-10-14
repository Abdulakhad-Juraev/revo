import React, {Component} from 'react';
import {Col, Container, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import "./Profil.scss"
import {imageRole, nameRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {getListAction, getListByAction} from "../../../redux/actionFuncs/mainActions";
import {getDateLLL, getMonthLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {MinusButton, PlusButton} from "../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import Pagination from "react-js-pagination";

class Profil extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name : 'payment'}))
        this.props.dispatch(getListByAction({name : 'payment', id : this.props.currentUser.id}))
        this.props.dispatch(getListAction({name : 'order_salary'}))
        console.clear()
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : "payment", page: (pageNumber - 1), size: this.props.size}))
    }

    render() {

        const {currentUser,paymentList, page,size,totalElements,salaryList} = this.props

        return (
            <div className={"profile py-3"}>
                <Container>
                        <div className={"profile-user"}>
                        <Row>
                            <Col md={5}>
                                <div className={"profile-header text-center bg-white"}>
                                    <img src={imageRole(currentUser)} alt="" className={"rounded-circle my-3 profile-img"}/>
                                    <h4 className="mt-0">{`${currentUser.firstName ?? ""}`}</h4>
                                    <p className="mb-0">
                                        Lavozim: {nameRole(currentUser)}
                                    </p>
                                </div>
                                <div className={"bg-white profile-header p-3 m-2"}>
                                    <Row>
                                        <Col md={4}>
                                            <p>Telefon raqam:</p>
                                            <p>Pul miqdori:</p>
                                            <p>Oylik maosh:</p>
                                        </Col>
                                        <Col md={8}>
                                            <p>{currentUser.phone}</p>
                                            <p>{getNumberLLL(currentUser.money)} $</p>
                                            <p>{getNumberLLL(currentUser.salary)}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={7}>
                                <div className={"bg-white mt-3 profile-header p-3"}>
                                    <Row>
                                        <Col>
                                            <h4>Oylik to'lovlari</h4>
                                            <div className={"profil-res-div"}>
                                                <div className={"profil-res-div2"}>
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
                                                        {salaryList ? salaryList.map((item,i) =>
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
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>

                                <div className={"bg-white profile-header p-3 m-2 my-4"}>
                                    <Row>
                                        <Col>
                                            <h4>To'lovlar</h4>
                                            <div className={"profil-res-div"}>
                                                <div className={"profil-res-div2"}>
                                                    <Table className={"m-2"}>
                                                        <thead>
                                                        <tr>
                                                            <th>Tr</th>
                                                            <th>Summa</th>
                                                            <th>Sana</th>
                                                            <th>Holat</th>
                                                            <th>Mijoz</th>
                                                            <th>Javobgar shaxs</th>
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
                                                </div>
                                            </div>
                                            <Pagination
                                                activePage={page + 1}
                                                itemsCountPerPage={size}
                                                totalItemsCount={totalElements}
                                                pageRangeDisplayed={5}
                                                onChange={this.handlePageChange.bind(this)} itemClass="page-item"
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
             page,size,totalElements,totalPages
         },
         auth: {currentUser}
     }) => ({
        loading, currentUser,attachmentUrl, paymentList,salaryList,
        page,size,totalElements,totalPages
    })
)(Profil);
