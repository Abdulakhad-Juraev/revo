import React, {Component} from 'react';
import "./Home.scss"
import {Button, Col, Container, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {getDashboardFilter} from "../../../redux/actionFuncs/inputFuncs";
import {getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {makeFirstCapital} from "../../../utils/PrimaryUtils";
import CustomDashboard from "../../../component/CustomComponents/CustomDashboard";
import {orderAccountant, orderSA} from "../../../utils/SecondaryFuncs/nameOfRole";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {FilterSvg} from "../../../component/Icons";

class Home extends Component {

    componentDidMount() {
        this.props.dispatch(getDashboardFilter("glass_dashboard"))
        this.props.dispatch(getDashboardFilter("affair_dashboard"))
        this.props.dispatch(getDashboardFilter("bank_dashboard"))
        this.props.dispatch(getDashboardFilter("salary_dashboard"))
        this.props.dispatch(getDashboardFilter("accessory_dashboard"))
        this.props.dispatch(getDashboardFilter("car_dashboard"))
        this.props.dispatch(getDashboardFilter("expense_dashboard"))
        this.props.dispatch(getDashboardFilter("pay_cash_dashboard"))
        this.props.dispatch(getDashboardFilter("payment_dashboard"))
        console.clear()
    }

    state = {
        colors: [
            '#3F4D76',
            '#21D2E7',
            '#2e991a',
            '#b63386',
            '#b68a33',
            '#3358b6',
            '#b83741',
            '#b65833',
        ]
    }

    render() {
        const {glassList, affairDashboardList, bankDashboardList, salaryDashboardList, accessoryDashboardList, carDashboardList, expenseDashboardList, payCashDashboardList,paymentDashboardList, currentUser} = this.props

        const {colors} = this.state;


        const getName = (array) => {
            if (array && array.length !== 0) {
                let arr = [];
                array.forEach(item => arr.push(item.name))
                return arr
            }
        }
        const getSumIn = (array) => {
            if (array && array.length !== 0) {
                let arr = [];
                array.forEach(item => arr.push(item.sumIn))
                return arr
            }
        }

        const getSumOut = (array) => {
            if (array && array.length !== 0) {
                let arr = [];
                array.forEach(item => arr.push(item.sumOut))
                return arr
            }
        }


        const filterDate = (e,v) => {
            this.props.dispatch(getDashboardFilter("glass_dashboard",v))
            this.props.dispatch(getDashboardFilter("affair_dashboard",v))
            this.props.dispatch(getDashboardFilter("bank_dashboard",v))
            this.props.dispatch(getDashboardFilter("salary_dashboard",v))
            this.props.dispatch(getDashboardFilter("accessory_dashboard",v))
            this.props.dispatch(getDashboardFilter("car_dashboard",v))
            this.props.dispatch(getDashboardFilter("expense_dashboard",v))
            this.props.dispatch(getDashboardFilter("pay_cash_dashboard",v))
            this.props.dispatch(getDashboardFilter("payment_dashboard",v))
        }

        console.log(glassList)

        return (
            <Container fluid>
                {orderSA(currentUser) || orderAccountant(currentUser) === true ?
                    <Container fluid>
                        <Row>
                            <Col>
                                <p className={"test1234"}>Statistika</p>

                                <div className={"calendarIconHome"}>
                                        <span>
                                            <FilterSvg />
                                        </span>
                                        <div className={"filterModal"}>
                                            <AvForm onValidSubmit={filterDate}>
                                                <AvField type={"datetime-local"} name={"startDate"} label={"Boshlanish sana"} />

                                                <AvField type={"datetime-local"} name={"endDate"} label={"Tugash sana"} />

                                                <AvField type={"hidden"} name={"date"} defaultValue={true} />

                                                <Button type={"submit"} color={"primary"}>Saralash</Button>&nbsp;
                                                <Button type={"submit"} color={"secondary"} onClick={() => filterDate(null,null)}>Bekor qilish</Button>
                                            </AvForm>
                                        </div>
                                </div>
                            </Col>
                        </Row>

                        <div className={"pt-2"}>
                            <Row>
                                <Col xl={7} md={12}>
                                    <Row>
                                        {
                                            glassList ? glassList.map(item =>
                                                <Col md={6} sm={6} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5} className={"col5"}>
                                                                <p className={"dashboard-statistic-name"}>{makeFirstCapital(item.name)}</p>
                                                                <p className={"dashboard-statistic-description"}>Soni
                                                                    : {item.count}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>so'm</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                    </Row>
                                    <Row className={"pt-4"}>
                                        {
                                            affairDashboardList ? affairDashboardList.map(item =>
                                                <Col md={4} sm={6} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <p className={"dashboard-statistic-name"}>{makeFirstCapital(item.name)}</p>
                                                                <p className={"dashboard-statistic-description"}>Soni
                                                                    : {item.count}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>Xizmatlar</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                        {
                                            salaryDashboardList ? salaryDashboardList.map(item =>
                                                <Col md={4} sm={6} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <p className={"dashboard-statistic-name"}>{makeFirstCapital(item.name)}</p>
                                                                <p className={"dashboard-statistic-description"}>Soni
                                                                    : {item.count}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>Oylik</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                        {
                                            expenseDashboardList ? expenseDashboardList.map(item =>
                                                <Col md={4} sm={12} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <p className={"dashboard-statistic-name"}>{makeFirstCapital(item.name)}</p>
                                                                <p className={"dashboard-statistic-description"}>Soni
                                                                    : {item.count}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>so'm</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                    </Row>
                                </Col>
                                <Col xl={5} md={12} xs={12} className={"Home-Col-RP pt-md-3 pt-xl-0"}>
                                    <Row>
                                        {
                                            payCashDashboardList ? payCashDashboardList.map(item =>
                                                <Col md={6} sm={6} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5} className={"col5"}>
                                                                <p className={"dashboard-statistic-name"}>To'lov</p>
                                                                <p className={"dashboard-statistic-description"}>{item.in ? "Kirim" : "Chiqim"}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>so'm</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                    </Row>
                                    <Row className={"mt-4"}>
                                        {
                                            paymentDashboardList ? paymentDashboardList.map(item =>
                                                <Col md={6} sm={6} xs={12} className={"Home-Col-RP"}>
                                                    <div className={"dashboard-statistic"}
                                                         style={{background: colors[Math.floor(Math.random() * colors.length)]}}>
                                                        <Row>
                                                            <Col xs={5} className={"col5"}>
                                                                <p className={"dashboard-statistic-name"}>Shartnoma</p>
                                                                <p className={"dashboard-statistic-description"}>{item.in ? "Kirim" : "Chiqim"}</p>
                                                            </Col>
                                                            <Col xs={7} className={"text-right"}>
                                                                <p className={"dashboard-statistic-price"}>{getNumberLLL(item.price)}</p>
                                                                <p className={"dashboard-statistic-description"}>so'm</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            ) : ''
                                        }
                                    </Row>
                                </Col>
                            </Row>


                            <Row className={"Home-Dashboard"}>
                                <Col md={6} xs={12} className={"pt-4"}>
                                    <div className={"dashboard-chart"}>
                                        <h4 className={"text-center"}>Bank Xizmatlari</h4>
                                        <CustomDashboard
                                            name={getName(bankDashboardList)}
                                            sumIn={getSumIn(bankDashboardList)}
                                            sumOut={getSumOut(bankDashboardList)}
                                        />
                                    </div>
                                </Col>

                                <Col md={6} xs={12} className={"pt-4"}>
                                    <div className={"dashboard-chart"}>
                                        <h4 className={"text-center"}>Mashina xizmatlari</h4>
                                        <CustomDashboard
                                            name={getName(carDashboardList)}
                                            sumIn={getSumIn(carDashboardList)}
                                            sumOut={getSumOut(carDashboardList)}
                                        />
                                    </div>
                                </Col>
                                <Col md={6} xs={12} className={"pt-4"}>
                                    <div className={"dashboard-chart"}>
                                        <h4 className={"text-center"}>Aksessuar sotuvi</h4>
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th>Tr</th>
                                                <th>Mahsulot</th>
                                                <th>son</th>
                                                <th>summa</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {accessoryDashboardList ? accessoryDashboardList.map((item, i) =>
                                                <tr key={i + 1}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.count}</td>
                                                    <td>{getNumberLLL(item.price)}</td>
                                                </tr>
                                            ) : ''}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container> :
                    <h2 className={"text-center"}>Assalomu alaykum {currentUser.firstName}!</h2>
                }
            </Container>
        );
    }
}

Home.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             expenseList, page, size, totalElements, totalPages,
             glassList, affairDashboardList, bankDashboardList, salaryDashboardList, accessoryDashboardList, carDashboardList, expenseDashboardList, payCashDashboardList,paymentDashboardList,
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        expenseList,
        page,
        size,
        totalElements,
        totalPages,
        glassList,
        affairDashboardList,
        bankDashboardList,
        salaryDashboardList,
        accessoryDashboardList,
        carDashboardList,
        expenseDashboardList,
        payCashDashboardList,
        paymentDashboardList,
        currentUser
    })
)(Home);
