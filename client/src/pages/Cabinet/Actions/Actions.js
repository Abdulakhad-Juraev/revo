import React, {Component} from 'react';
import {getOperationFilter} from "../../../redux/actionFuncs/inputFuncs";
import {connect} from "react-redux";
import Header from "../../../component/Header/Header";
import {Container, Table} from "reactstrap";
import {getDateLLL, getNameLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import CustomTableTooltipUser from "../../../component/CustomComponents/CustomTableTooltipUser";
import {MinusButton, PlusButton, ViewButton} from "../../../component/CustomComponents/CustomButtons";
import {Link} from "react-router-dom";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import "./Action.scss"

class Actions extends Component {
    componentDidMount() {
        this.props.dispatch(getOperationFilter("operation"))
        console.clear()
    }

    render() {

        const {operation, currentUser} = this.props



        const getData = (item) => {
            switch (item.name) {
                case "car_affair" :
                    return item.object.car.name
                case "bank_affair" :
                    return item.object.bank.name
                case "order_accessory" :
                    return item.object.orderAccessoryList[0]['accessory']['name']
                case "expense" :
                    return item.object.description
            }
        }


        const viewData = (item) => {
            switch (item.name) {
                case "income" :
                    return <Link to={`/${routeRole(currentUser)}/income/${item.id}`}><ViewButton/></Link>
                case "shipment" :
                    return <Link to={`/${routeRole(currentUser)}/shipment/${item.id}`}><ViewButton/></Link>
                case "order_affair" :
                    return <Link to={`/${routeRole(currentUser)}/order-affair/${item.id}`}><ViewButton/></Link>
                case "order_accessory" :
                    return <Link to={`/${routeRole(currentUser)}/accessory-${item.in ? "income" : "shipment"}/${item.id}`}><ViewButton/></Link>
            }
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Kunlik amallar"} plus={false} filter={"income"}
                        isFilter={true}
                        operation={true}
                />

                <div className={"res-div"}>
                    <Table className={"bg-white"}>
                        <thead>
                        <tr>
                            <th>Tr</th>
                            <th>Nomi</th>
                            <th>Malumot</th>
                            <th>Summa</th>
                            <th>Sana</th>
                            <th>Javobgar shaxs</th>
                            <th>Qabul qiluvchi</th>
                            <th>Mijoz</th>
                            <th>Holat</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {console.log(operation)}
                        {operation ? operation.map((item, i) =>
                            <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{getNameLLL(item.name)}</td>
                                <td>{getData(item)}</td>
                                <td>{getNumberLLL(item.price)}</td>
                                <td>{getDateLLL(item.date)}</td>
                                <td><CustomTableTooltipUser user={item.user}/></td>
                                <td>{item.name === "income" || "shipment" ? <CustomTableTooltipUser
                                    user={item && item.object && item.object.confirming ? item.object.confirming : null}/> : ''}</td>
                                <td>{item.client !== null ? <CustomTableTooltipUser user={item.client}/> : ''}</td>
                                <td>{item.name === "order_accessory" ? item.in ? "Olish" : "Sotish" : ''}</td>
                                <td>{viewData(item)}</td>
                            </tr>
                        ) : <tr>
                            <th colSpan={10} className={"text-center"}><h3>Ma'lumot mavjud emas!</h3></th>
                        </tr>}
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}


export default connect(
    ({
         app: {
             operation
         },
         auth: {currentUser}
     }) => ({
        operation, currentUser
    })
)(Actions);
