import React, {Component} from 'react';
import {Button, Col, Container, FormGroup, Input, Label, Row, Table} from "reactstrap";
import {AvField, AvForm, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import Select from "react-select";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import {getListAction, getOneAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import {
    CheckButton,
    DeleteButton,
    EditButton,
    PlusButton,
    ViewButton
} from "../../../component/CustomComponents/CustomButtons";
import {getDateLLL, getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {routeRole} from "../../../utils/SecondaryFuncs/nameOfRole";
import {Link} from "react-router-dom";
import Header from "../../../component/Header/Header";
import {getUserSearchAction} from "../../../redux/actions/CustomActions/UserAction";

class OrderAffairShipment extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'section'}))
        this.props.dispatch(getListAction({name: 'affair'}))
        this.props.dispatch(getListAction({name: "client"}))
        this.props.dispatch(getOneAction({api: "shipment", id: this.props.identity}))
        console.clear()
    }

    state = {
        inputs: [
            {
                id: uuidv4(),
                affairId: "",
                affairName: "",
                orderId: "",
                orderName: "",
                price: "",
                count: "",
                sum: '',
                description: '',
                status: false,
                item: {}
            }
        ],
        clientId: "",
        clientCheck: false,
        summa: 0,
        order: false
    }

    render() {

        const {inputs, clientId, summa, order, clientCheck} = this.state
        const {dispatch, clientListSelect, affairListSelect, affairList, course, sectionList, identity, currentUser, shipmentOne,userOne} = this.props

        const makeArray = () => {
            let arr = []
            if (shipmentOne && shipmentOne.orderList){
                shipmentOne.orderList.forEach(item =>
                    arr.push({
                        value: item.id,
                        label: `${item.template.name} / ${item.absolute ? `${item.template.width} x ${item.template.height}, ${item.template.size}` : `${item.width} x ${item.height}, ${item.size}`}`
                    })
                )
            }

            return arr
        }

        const addProduct = () => {
            let arr = [...inputs]
            arr.push({id: uuidv4(), status: false})
            this.setState({inputs: arr})
        }
        const removeProduct = (index) => {
            let arr = [...this.state.inputs]
            arr.splice(index, 1)
            this.setState({inputs: arr})
        }
        const saveProduct = (id) => {
            let price = document.getElementById("price/" + id).value
            let count = document.getElementById("count/" + id).value
            let sum = document.getElementById("sum/" + id).value
            let affairId = document.getElementById("affairId/" + id).value
            let affairName = document.getElementById("affairName/" + id).innerText
            let orderId = document.getElementById("orderId/" + id).value
            let orderName = document.getElementById("orderName/" + id).innerText

            let description = document.getElementById("description/" + id).value

            let arr = [...inputs]
            let index = this.state.inputs.findIndex(index => (index.id === id))
            let tr = arr[index]

            tr.affairId = affairId
            tr.affairName = affairName
            tr.orderId = orderId
            tr.orderName = orderName
            tr.price = price
            tr.count = count
            tr.sum = sum
            tr.description = description
            tr.status = true

            this.setState({inputs: arr})

            let allSum = 0
            inputs.forEach(item => allSum += (item.sum * 1))
            this.setState({summa: allSum})
        }
        const editProduct = (id) => {
            let index = this.state.inputs.findIndex(item => (item.id === id))
            let arr = [...inputs]
            arr[index]['status'] = false
            this.setState({inputs: arr})
        }

        const calc = (e, id, name) => {
            if (name === "count") {
                let price = document.getElementById("price/" + id).value
                if (price === "" || price === null) {
                } else {
                    document.getElementById("sum/" + id).value = price * (e.target.value)
                }
            } else if (name === "price") {
                let count = document.getElementById("count/" + id).value
                if (count === "" || count === null) {
                } else {
                    document.getElementById("sum/" + id).value = count * (e.target.value)
                }
            }
        }
        const getPrice = (e, id, name) => {
            if (e.value === 0) {
                console.log(e.value)
            } else {
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let arr = [...inputs]
                let tr = arr[index]
                if (name === "affair") {
                    affairList.map(item => setTr(tr, item, e))
                    document.getElementById(`affairId/${id}`).value = e.value
                } else {
                    document.getElementById(`orderId/${id}`).value = e.value
                    tr.orderName = e.label
                }
                this.setState({inputs: arr})
            }
        }

        const checkFun = (e) => {
            this.setState({order: e.target.value})
        }

        const setTr = (tr, item, e) => {
            if (item.id === e.value) {
                tr.price = item.price
                tr.item = item
            }
            return tr;
        }

        const saveForm = (e, v) => {
            if (inputs.length !== 0) {
                let index = inputs.findIndex(item => item.status === false)

                if (index !== -1) {
                    toast.error("Jadvaldagi ma'lumotlar t'oliq kiritilmagan")
                } else {
                    v.affairList = inputs;
                    v.clientId = clientId;
                    v.shipmentB = false
                    if (v.order) {
                        if (v.sectionId !== 0) {
                            dispatch(simpleAction(v, {
                                cAPI: "order_affair",
                                type: v.id !== '' ? "edit" : "save"
                            }, true))
                        } else {
                            toast.error("Bo'lim tanlanmagan")
                        }
                    } else {
                        dispatch(simpleAction(v, {cAPI: "order_affair", type: v.id !== '' ? "edit" : "save"}, true))
                    }
                }
            } else {
                toast.error("Jadvaldagi ma'lumotlar to'liq kiritilmagan")
            }
        }

        const getClient = (e) => {
            // this.setState({clientId: e.value})
            let phone = e.target.value
            if (phone.length === 13) {
                dispatch(getUserSearchAction(phone))
                this.setState({clientCheck: true})
            }
        }
        return (
            <Container fluid className={"m-0 p-0"}>
                <Header title={"Shartnoma : " + shipmentOne.id} plus={false}/>
                <div className={"res-div"}>
                    <Table className={"mt-3 bg-white"}>
                        <thead>
                        <tr>
                            <th>Tr</th>
                            <th>Namuna</th>
                            <th>Oyna o'lchami</th>
                            <th>Soni</th>
                            <th>Narxi</th>
                            <th>Summa</th>
                            <th>Sana</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shipmentOne.orderList ? shipmentOne.orderList.map((item,i) =>
                            <tr key={item.id}>
                                <th>{i+1}</th>
                                <td>{item.template.name ?? ''}</td>
                                <td>{item.piece ? "Butun" : `${item.width} x ${item.height}, ${item.size} kv/m`}</td>
                                <td>{item.count ?? ''}</td>
                                <td>{getNumberLLL(item.price ?? '')}</td>
                                <td>{(item.price * item.count) ?? ''}</td>
                                <td>{getDateLLL(item.date)}</td>
                            </tr>
                        ) : ''}
                        </tbody>
                    </Table>

                    <PlusButton fun={addProduct}/>
                    <AvForm onValidSubmit={saveForm}>
                        <AvField type={"hidden"} name={"id"}/>
                        <Table className={"bg-white"}>
                            <thead>
                            <tr>
                                <th>Tr</th>
                                <th>Xizmat turi</th>
                                <th>Mahsulot</th>
                                <th>1 o'lchov uchun narx</th>
                                <th>o'lchov</th>
                                <th>Jami summa</th>
                                <th>Izoh</th>
                                <th>Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inputs ? inputs.map((item, i) =>
                                item.status ?
                                    <tr key={item.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td className={"product-input"}>
                                            <Input type={"text"} value={item.affairName} disabled/>
                                        </td>
                                        <td className={"product-input"}>
                                            <Input type={"text"} value={item.affairName} disabled/>
                                        </td>
                                        <td><Input type={"number"} value={item.price} disabled/></td>
                                        <td><Input type={"number"} value={item.count} disabled/></td>
                                        <td><Input type={"number"} value={item.sum} disabled/></td>
                                        <td><Input type={"text"} value={item.description} disabled/></td>
                                        <td>
                                            <EditButton fun={() => editProduct(item.id)}/>
                                            <DeleteButton fun={() => removeProduct(i)}/>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={item.id}>
                                        <th scope="row">{i + 1}</th>
                                        <td className={"product-input"}>
                                            <Select
                                                id={`affairName/${item.id}`}
                                                defaultValue={{label: item.affairName, value: item.affairId}}
                                                selectedValue={{label: item.affairName, value: item.affairId}}
                                                onChange={(e) => getPrice(e, item.id, "affair")}
                                                placeholder={"Xizmat"}
                                                isSearchable={true}
                                                options={affairListSelect}
                                                classNamePrefix={"select"}
                                            />
                                            <input id={`affairId/${item.id}`} type={"hidden"}/>
                                        </td>
                                        <td className={"product-input"}>
                                            <Select
                                                id={`orderName/${item.id}`}
                                                defaultValue={{label: item.orderName, value: item.orderId}}
                                                selectedValue={{label: item.orderName, value: item.orderId}}
                                                onChange={(e) => getPrice(e, item.id, "order")}
                                                placeholder={"Mahsulot"}
                                                isSearchable={true}
                                                options={makeArray()}
                                                classNamePrefix={"select"}
                                            />
                                            <input id={`orderId/${item.id}`} type={"hidden"}/>
                                        </td>
                                        <td><Input type={"number"} min={0} id={`price/${item.id}`}
                                                   defaultValue={item.price}
                                                   onChange={(e) => calc(e, item.id, "price")}/></td>
                                        <td><Input type={"number"} min={0} id={`count/${item.id}`}
                                                   defaultValue={item.count}
                                                   onChange={(e) => calc(e, item.id, "count")}/></td>
                                        <td><Input type={"text"} id={`sum/${item.id}`} defaultValue={item.sum}
                                                   disabled/></td>
                                        <td><Input type={"text"} id={`description/${item.id}`}
                                                   defaultValue={item.description}/></td>
                                        <td>
                                            <CheckButton fun={() => saveProduct(item.id)}/>
                                            <DeleteButton fun={() => removeProduct(i)}/>
                                        </td>
                                    </tr>
                            ) : ''}
                            </tbody>
                        </Table>
                        <Row className={"mb-3"}>
                            <Col md={4}>
                                <Row>
                                    <Col>
                                        <AvField type={"search"} name={"clientPhone"} onChange={getClient}
                                                 value={"+998"} label={"Mijoz raqamini kiriting"}/>
                                        {clientCheck && userOne == null ?
                                            <h5 className={"text-danger"}>Mijoz topilmadi</h5> : ''}
                                    </Col>
                                    <Col>
                                        <div>
                                            <FormGroup>
                                                <AvField type={"search"} name={"clientFirst"}
                                                         label={"Mijoz ismi"} value={userOne ? userOne.firstName ?? '' : ''}
                                                         disabled={!!userOne}/>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4}/>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleEmail">Jami summa ($)</Label>
                                    <h4 className={"form-control"}>{course && course.value ? summa !== 0 ? getNumberLLL(summa / course.value) : getNumberLLL(summa) : getNumberLLL(summa)} $</h4>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="exampleEmail">Jami summa (so'mda)</Label>
                                    <Input value={summa} disabled/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Link to={`/${routeRole(currentUser)}/shipment`}>
                            <Button type={"reset"} color={"secondary mr-2"}>Bekor qilish</Button>
                        </Link>

                        <Button type={"Submit"} color={"primary"}>Saqlash</Button>
                    </AvForm>
                </div>
            </Container>
        );
    }
}


export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, course, sectionList,
             attachmentId, attachmentUrl, viewImageModal, clientListSelect, affairListSelect, affairList, shipmentOne,userOne
         },
         auth: {currentUser}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        course,
        sectionList,
        attachmentId,
        attachmentUrl,
        viewImageModal,
        clientListSelect,
        affairListSelect,
        affairList,
        currentUser,
        shipmentOne,
        userOne
    })
)(OrderAffairShipment);