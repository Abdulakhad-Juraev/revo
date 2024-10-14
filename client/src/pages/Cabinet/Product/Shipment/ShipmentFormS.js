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
                templateId: '',
                templateName: '',
                template : {},
                sq: '',
                price: '',
                width: '',
                height: '',
                size: '',
                allSize: '',
                count: '',
                sum: '',
                status: false,
            }
        ],
        clientId: "",
        clientCheck: false,
        summa: 0,
        viewModal: false
    }

    render() {

        const {inputs, clientId, summa, viewModal, clientCheck} = this.state
        const {course, templateShipmentList, shipmentListProducts, dispatch, clientListSelect, userOne} = this.props


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
            let sq = document.getElementById("sq/" + id).value

            let width = document.getElementById("width/" + id).value
            let height = document.getElementById("height/" + id).value
            let size = document.getElementById("size/" + id).value
            let allSize = document.getElementById("allSize/" + id).value
            let price = document.getElementById("price/" + id).value
            let count = document.getElementById("count/" + id).value
            let sum = document.getElementById("sum/" + id).value
            let templateId = document.getElementById("templateId/" + id).value
            let templateName = document.getElementById("templateName/" + id).innerText

            if ((sq * 1) >= ((count * 1) * (size * 1))) {
                let arr = [...inputs]
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let tr = arr[index]

                tr.templateId = templateId
                tr.templateName = templateName
                tr.sq = sq
                tr.width = width
                tr.height = height
                tr.size = size
                tr.allSize = allSize
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


        const calc = (e, item, name) => {
            let id = item.id
            if (name === "count") {
                let price = document.getElementById("price/" + id).value
                if (price === "" || price === null) {
                } else {
                    let size = document.getElementById("size/" + id).value


                    document.getElementById("sum/" + id).value = price * size * e.target.value
                    document.getElementById("allSize/" + id).value = size * e.target.value
                }
            } else if (name === "width") {
                let count = document.getElementById("count/" + id).value
                let height = document.getElementById("height/" + id).value
                if (height === "" || height === null) {
                } else {
                    document.getElementById("size/" + id).value = (height * (e.target.value)) / 10000
                    document.getElementById("allSize/" + id).value = ((height * (e.target.value)) / 10000) * count
                }
            } else if (name === "height") {
                let count = document.getElementById("count/" + id).value
                let width = document.getElementById("width/" + id).value
                if (width === "" || width === null) {
                } else {
                    document.getElementById("size/" + id).value = (width * (e.target.value)) / 10000
                    document.getElementById("allSize/" + id).value = ((width * (e.target.value)) / 10000) * count
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
                let sq = 0
                templateShipmentList.map(item => item.value === e.value ?
                    <>
                        {sq =  "" + item.item.listSquare}
                        {tr.leftover = item.leftover}
                        {tr.sq = sq.substr(0, sq.indexOf(".") + 3)}
                        {tr.price = item.item.price}
                        {tr.templateId = e.value}
                        {tr.template = item.item}
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
            if (phone.length === 13) {
                dispatch(getUserSearchAction(phone))
                this.setState({clientCheck: true})
            }
        }
        return (
            <div className={"res-div"}>
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
                                            <th className={"text-center"}>Qoldiq (KV)</th>
                                            <th>Bo'y</th>
                                            <th>En</th>
                                            <th>O'lcham</th>
                                            <th>Soni</th>
                                            <th>Narxi</th>
                                            <th>Jami o'lcham</th>
                                            <th>Jami summa</th>
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
                                                        <Col><Input type={"number"} disabled value={item.sq}/></Col>
                                                    </td>
                                                    {item.piece ? <td/> :
                                                        <td><Input type={"number"} value={item.width} disabled/></td>}
                                                    {item.piece ? <td/> :
                                                        <td><Input type={"number"} value={item.height} disabled/></td>}
                                                    {item.piece ? <td/> :
                                                        <td><Input type={"number"} value={item.size} disabled/></td>}
                                                    <td><Input type={"number"} value={item.count} disabled/></td>
                                                    <td><Input type={"number"} value={item.price} disabled/></td>
                                                    <td><Input type={"number"} value={item.allSize} disabled/></td>
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
                                                        <Input type={"number"} min={0} id={`sq/${item.id}`}
                                                               defaultValue={item.sq} disabled/>
                                                    </td>
                                                    <td><Input type={"number"} defaultValue={item.width}
                                                               id={`width/${item.id}`}
                                                               onChange={(e) => calc(e, item, "width")}/></td>
                                                    <td><Input type={"number"} defaultValue={item.height}
                                                               id={`height/${item.id}`}
                                                               onChange={(e) => calc(e, item, "height")}/></td>

                                                    <td><Input type={"number"} defaultValue={item.size}
                                                               id={`size/${item.id}`} disabled/></td>


                                                    <td><Input type={"number"} min={0} id={`count/${item.id}`}
                                                               defaultValue={item.count}
                                                               onChange={(e) => calc(e, item, "count")}/></td>
                                                    <td><Input type={"number"} min={0} id={`price/${item.id}`}
                                                               defaultValue={item.price} disabled/></td>
                                                    <td><Input type={"number"} defaultValue={item.allSize}
                                                               id={`allSize/${item.id}`} disabled/></td>
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
                                                             label={"Mijoz ismi"}
                                                             value={userOne ? userOne.firstName ?? '' : ''}
                                                             disabled={!!userOne}/>
                                                </FormGroup>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3}/>
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
             openModal, deleteModal, currentItem, currentObject, userOne,
             attachmentId, attachmentUrl, viewImageModal, templateShipmentList, shipmentListProducts, clientListSelect, shipmentList, course,
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