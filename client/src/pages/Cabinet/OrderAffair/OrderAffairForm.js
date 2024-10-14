import React, {Component} from 'react';
import {Button, Col, Container, FormGroup, Input, Label, Row, Table} from "reactstrap";
import {AvField, AvForm, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import Select from "react-select";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import {getListAction, simpleAction} from "../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import {CheckButton, DeleteButton, EditButton, PlusButton} from "../../../component/CustomComponents/CustomButtons";
import {getNumberLLL} from "../../../utils/SecondaryFuncs/customDate";
import {getUserSearchAction} from "../../../redux/actions/CustomActions/UserAction";

class OrderAffairForm extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: 'section'}))
        this.props.dispatch(getListAction({name: 'affair'}))
        this.props.dispatch(getListAction({name: "client"}))
        console.clear()
    }

    state = {
        inputs: [
            {
                id: uuidv4(),
                affairId: "",
                affairName: "",
                price: "",
                count: "",
                sum: '',
                description : '',
                status: false,
                item : {}
            }
        ],
        clientId: "",
        clientCheck: false,
        summa : 0,
        order : false
    }

    render() {

        const {inputs, clientId,summa, order,clientCheck} = this.state
        const {dispatch,clientListSelect, affairListSelect, affairList, course, sectionList, userOne} = this.props

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
            let description = document.getElementById("description/" + id).value

            let arr = [...inputs]
            let index = this.state.inputs.findIndex(index => (index.id === id))
            let tr = arr[index]

            tr.affairId = affairId
            tr.affairName = affairName
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

        const calc = (e, item) => {
            let price = document.getElementById("price/" + item.id).value
            if (price === "" || price === null) {
            } else {
                document.getElementById("sum/" + item.id).value = price * (e.target.value)
            }
        }
        const getPrice = (e, id) => {
            if (e.value === 0) {
                console.log(e.value)
            } else {
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let arr = [...inputs]
                let tr = arr[index]
                affairList.map(item => setTr(tr,item,e))
                this.setState({inputs: arr})
                document.getElementById(`affairId/${id}`).value = e.value
            }
        }

        const checkFun = (e) => {
            this.setState({order : e.target.value})
        }

        const setTr = (tr, item,e) => {
            if (item.id === e.value) {
                tr.price = item.price
                tr.item = item
            }
            return tr;
        }

        const saveForm = (e,v) => {
            if (inputs.length !== 0){
                let index = inputs.findIndex(item => item.status === false)

                if (index !== -1){
                    toast.error("Jadvaldagi ma'lumotlar t'oliq kiritilmagan")
                }else {
                    v.affairList = inputs;
                    v.clientId = clientId;
                    v.shipmentB = false
                    if (v.order){
                        if (v.sectionId !== 0){

                            dispatch(simpleAction(v, {cAPI : "order_affair", type: v.id !== '' ? "edit" : "save"},false))
                        }else {
                            toast.error("Bo'lim tanlanmagan")
                        }
                    }else {
                        dispatch(simpleAction(v, {cAPI : "order_affair", type: v.id !== '' ? "edit" : "save"},false))
                    }
                }
            }else {
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
                    <div className={"res-div"}>
                        <h4 className={"text-danger p-2 table-bordered"}>Oyna mijozning o'zidan</h4>
                        <PlusButton fun={addProduct}/>
                        <AvForm onValidSubmit={saveForm}>
                            <AvField type={"hidden"} name={"id"} />
                            <Table className={"bg-white"}>
                                <thead>
                                <tr>
                                    <th>Tr</th>
                                    <th>Xizmat turi</th>
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
                                            <td className={"product-input"}><Input type={"text"} value={item.affairName}
                                                                                   disabled/>
                                            </td>
                                            <td><Input type={"number"} value={item.price} disabled/></td>
                                            <td><Input type={"number"} value={item.count} disabled/></td>
                                            <td><Input type={"number"} value={item.sum} disabled/></td>
                                            <td><Input type={"text"} value={item.description} disabled/></td>
                                            <td>
                                                <EditButton fun={() => editProduct(item.id)} />
                                                <DeleteButton fun={() => removeProduct(i)} />
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
                                                    onChange={(e) => getPrice(e, item.id)}
                                                    placeholder={"Mahsulot"}
                                                    isSearchable={true}
                                                    options={affairListSelect}
                                                    classNamePrefix={"select"}
                                                />
                                                <input id={`affairId/${item.id}`} type={"hidden"}/>
                                            </td>
                                            <td><Input type={"number"} min={0} id={`price/${item.id}`}
                                                       defaultValue={item.price} /></td>
                                            <td><Input type={"number"} min={0} id={`count/${item.id}`}
                                                       defaultValue={item.count} onChange={(e) => calc(e, item)}/></td>
                                            <td><Input type={"text"} id={`sum/${item.id}`} defaultValue={item.sum}
                                                       disabled/></td>
                                            <td><Input type={"text"} id={`description/${item.id}`} defaultValue={item.description}/></td>
                                            <td>
                                                <CheckButton fun={() => saveProduct(item.id)} />
                                                <DeleteButton fun={() => removeProduct(i)} />
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
                                <Col md={4} />
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
                            <Button type={"reset"} color={"secondary mr-2"}>Bekor qilish</Button>
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
             openModal, deleteModal, currentItem, currentObject, course, sectionList,userOne,
             attachmentId, attachmentUrl, viewImageModal,clientListSelect,affairListSelect, affairList
         },
         auth: {}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, course, sectionList,userOne,
        attachmentId, attachmentUrl, viewImageModal,clientListSelect, affairListSelect, affairList
    })
)(OrderAffairForm);