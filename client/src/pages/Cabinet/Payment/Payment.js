import React, {Component} from 'react';
import {getListAction,} from "../../../redux/actionFuncs/mainActions";
import {Container, Nav, NavItem, NavLink, Table} from "reactstrap";
import Header from "../../../component/Header/Header";
import {connect} from "react-redux";
import {getDateLLL, getNameLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {MinusButton, PlusButton} from "../../../component/CustomComponents/CustomButtons";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import Pagination from "react-js-pagination";

class Payment extends Component {
    componentDidMount() {
        this.props.dispatch(getListAction({name: "payment"}))
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getListAction({name : this.state.pageRole, page: (pageNumber - 1), size: this.props.size}))
    }

    state = {
        pageRole : 'payment',
        sum : 0
    }
    render() {
        const {paymentList, dispatch, page,size,totalElements} = this.props
        const {pageRole} = this.state

        const setPageRole = (role) => {
            this.setState({pageRole: role})
            dispatch(getListAction({name: role}))
        }

        return (
            <Container fluid className={"m-0 p-0"}>
                <div>
                    <Header title={"To'lovlar ro'yxati"}
                            filter={pageRole}
                            isFilter={true}
                    />

                    <div className={"custom-res-div"}>
                        <div className={"custom-res-div2"}>
                            <Nav tabs  className={"bg-white"}>
                                <NavItem className={pageRole === 'payment' ? "tab-item-style-active" : "tab-item-style-default1"}>
                                    <NavLink onClick={() => setPageRole("payment")} className={"NavLink-hover"}>
                                        To'lov shartnomalari
                                    </NavLink>
                                </NavItem>
                                <NavItem className={pageRole === 'pay_cash' ? "tab-item-style-active" : "tab-item-style-default1"}>
                                    <NavLink onClick={() => setPageRole("pay_cash")} className={"NavLink-hover"}>
                                        To'lovlar
                                    </NavLink>
                                </NavItem>

                            </Nav>
                            <Table className={"m-2 bg-white"}>
                                <thead>
                                <tr>
                                    <th>Tr</th>
                                    <th>Shartnoma</th>
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
                                        <td>{getNameLLL(item.description)}</td>
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
                                onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,paymentList, page,size,totalElements,
             productList, attachmentId, attachmentUrl, viewImageModal
         },
         auth: {}
     }) => ({
        openModal, deleteModal, currentItem, currentObject,paymentList, page,size,totalElements,
        productList, attachmentId, attachmentUrl, viewImageModal
    })
)(Payment);