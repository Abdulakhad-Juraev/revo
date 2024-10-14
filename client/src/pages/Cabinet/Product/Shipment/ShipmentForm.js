import React, {Component} from 'react';
import {Button, Col, Container, FormGroup, Input, Label, Modal, ModalFooter, Row, Table} from "reactstrap";
import plus from "../../../../resources/outline/plus.svg";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import Select from "react-select";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import {getListAction, getListByAction, simpleAction} from "../../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import {
    CheckButton,
    DeleteButton,
    EditButton,
    ViewButton,
    ViewOffButton
} from "../../../../component/CustomComponents/CustomButtons";
import {getDateLLL, getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import {getUserSearchAction} from "../../../../redux/actions/CustomActions/UserAction";

class ShipmentForm extends Component {

    componentDidMount() {
        console.clear()
        this.props.dispatch(getListAction({name: "template_shipment"}))
    }

    state = {
        inputs: [
            {
                id: uuidv4(),
                templateId: "",
                templateName: "",
                leftover: '',
                price: "",
                count: "",
                sum: "",
                status: false,
            }
        ],
        clientId: "",
        clientCheck : false,
        summa: 0,
        viewModal: false
    }

    render() {

        const {inputs, clientId, summa, viewModal,clientCheck} = this.state
        const {course, templateShipmentList, shipmentListProducts, dispatch,userOne} = this.props


        const addProduct = () => {
            let arr = [...inputs]
            arr.push({id: uuidv4(), templateId: "", status: false})
            this.setState({inputs: arr})
        }
        const removeProduct = (index) => {
            let arr = [...this.state.inputs]
            arr.splice(index, 1)
            this.setState({inputs: arr})
        }
        const saveProduct = (id) => {
            let leftover = document.getElementById("leftover/" + id).value
            let price = document.getElementById("price/" + id).value
            let count = document.getElementById("count/" + id).value
            let sum = document.getElementById("sum/" + id).value
            let templateId = document.getElementById("templateId/" + id).value
            let templateName = document.getElementById("templateName/" + id).innerText

            if ((leftover * 1) >= (count * 1)) {
                let arr = [...inputs]
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let tr = arr[index]

                tr.templateId = templateId
                tr.templateName = templateName
                tr.leftover = leftover
                tr.price = price
                tr.count = count
                tr.sum = sum
                tr.status = true

                this.setState({inputs: arr})

                let allSum = 0
                inputs.forEach(item => allSum += (item.sum * 1))
                this.setState({summa: allSum})

            } else {
                toast.error("Mahsulot yetarli emas!")
            }
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

        const getCount = (e, id) => {
            if (e.value === 0) {
                console.log(e.value)
            } else {
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let arr = [...inputs]
                let tr = arr[index]
                templateShipmentList.map(item => item.value === e.value ?
                    <>
                        {console.log(item)}
                        {tr.leftover = item.item.count}
                        {tr.templateId = e.value}
                    </>
                    : '')
                this.setState({inputs: arr})
                document.getElementById(`templateId/${id}`).value = e.value
            }
        }

        const saveForm = (e, v) => {
            if (inputs.length !== 0) {
                let index = inputs.findIndex(item => item.status === false)

                if (index !== -1) {
                    toast.error("Jadvaldagi malumotlar toliq kiritilmagan")
                } else {
                    v.orderList = inputs;
                    v.clientId = clientId;
                    dispatch(simpleAction(v, {cAPI: "shipment", type: v.id !== '' ? "edit" : "save"}, false))
                }
            } else {
                toast.error("Jadvaldagi malumotlar toliq kiritilmagan")
            }
        }
        const getClient = (e) => {
            let phone = e.target.value
            if (phone.length === 13){
                dispatch(getUserSearchAction(phone))
                this.setState({clientCheck : true})
            }
        }
        return (
            <div className={"res-div"}>
                <h4>Oyna sotish (List hisobida)</h4>
                <hr/>
                <Button color={"outline-success"} onClick={addProduct}><img src={plus} alt=""/></Button>
                <Container fluid className={"m-0 p-0"}>
                    <div>
                        <AvForm onValidSubmit={saveForm}>
                            <AvField type={"hidden"} name={"id"}/>
                            <div className={"custom-res-div"}>
                                <div className={"custom-res-div2"}>
                                    <Table className={"bg-white"}>
                                        <thead>
                                        <tr>
                                            <th>Tr</th>
                                            <th>Mahsulot</th>
                                            <th className={"text-center"}>Qoldiq (Dona)</th>
                                            <th>Dona</th>
                                            <th>Narxi</th>
                                            <th>Jami</th>
                                            <th>Amal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {inputs ? inputs.map((item, i) =>
                                            item.status ?
                                                <tr key={item.id}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td className={"product-input"}><Input type={"text"}
                                                                                           value={item.templateName}
                                                                                           disabled/>
                                                    </td>
                                                    <td>
                                                        <Input type={"number"} disabled value={item.leftover}/>
                                                    </td>
                                                    <td><Input type={"number"} value={item.count} disabled/></td>
                                                    <td><Input type={"number"} value={item.price} disabled/></td>
                                                    <td><Input type={"number"} value={item.sum} disabled/></td>
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
                                                            id={`templateName/${item.id}`}
                                                            defaultValue={{
                                                                label: item.templateName,
                                                                value: item.templateId
                                                            }}
                                                            selectedValue={{
                                                                label: item.templateName,
                                                                value: item.templateId
                                                            }}
                                                            onChange={(e) => getCount(e, item.id)}
                                                            placeholder={"Mahsulot"}
                                                            isSearchable={true}
                                                            options={templateShipmentList}
                                                            classNamePrefix={"select"}
                                                        />
                                                        <input id={`templateId/${item.id}`} type={"hidden"}/>
                                                    </td>

                                                    <td>
                                                        <Input type={"number"} min={0} id={`leftover/${item.id}`}
                                                               defaultValue={item.leftover} disabled/>
                                                    </td>

                                                    <td><Input type={"number"} min={0} id={`count/${item.id}`}
                                                               defaultValue={item.count}
                                                               onChange={(e) => calc(e, item.id, "count")}/></td>
                                                    <td><Input type={"number"} min={0} id={`price/${item.id}`}
                                                               defaultValue={item.price}
                                                               onChange={(e) => calc(e, item.id, "price")}/></td>
                                                    <td><Input type={"text"} id={`sum/${item.id}`}
                                                               defaultValue={item.sum}
                                                               disabled/></td>
                                                    <td>
                                                        <CheckButton fun={() => saveProduct(item.id)}/>
                                                        <DeleteButton fun={() => removeProduct(i)}/>
                                                    </td>
                                                </tr>
                                        ) : ''}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <Row>
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
                                <Col md={3} />
                                <Col md={2} >
                                    <FormGroup>
                                        <Label for="exampleEmail">Jami summa ($)</Label>
                                        <h4 className={"form-control"}>{course && course.value ? summa !== 0 ? getNumberLLL(summa /course.value) : getNumberLLL(summa) : getNumberLLL(summa)} $</h4>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Jami summa (so'mda)</Label>
                                        <Input value={summa} disabled />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type={"Submit"} color={"primary"}>Saqlash</Button>
                        </AvForm>
                    </div>
                </Container>

            </div>
        );
    }
}

ShipmentForm.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject,
             attachmentId, attachmentUrl, viewImageModal, templateShipmentList, shipmentListProducts, clientListSelect, shipmentList, course,
             userOne
         },
         auth: {}
     }) => ({
        openModal,
        deleteModal,
        currentItem,
        currentObject,
        attachmentId,
        attachmentUrl,
        viewImageModal,
        templateShipmentList,
        shipmentListProducts,
        clientListSelect,
        shipmentList,
        course,
        userOne
    })
)(ShipmentForm);