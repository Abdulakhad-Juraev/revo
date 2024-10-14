import React, {Component} from 'react';
import {Button, Col, Container, Input, Row, Table, FormGroup, Label} from "reactstrap";
import plus from "../../../../resources/outline/plus.svg";
import {AvField, AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import {v4 as uuidv4} from "uuid";
import {toast} from "react-toastify";
import {
    getListAction,
    getOneAction,
    simpleAction
} from "../../../../redux/actionFuncs/mainActions";
import {connect} from "react-redux";
import {CheckButton, DeleteButton, EditButton} from "../../../../component/CustomComponents/CustomButtons";
import {getNumberLLL} from "../../../../utils/SecondaryFuncs/customDate";
import {getUserSearchAction} from "../../../../redux/actions/CustomActions/UserAction";


class IncomeForm extends Component {

    componentDidMount() {
        this.props.dispatch(getListAction({name: "template"}))
    }

    state = {
        inputs: [
            {
                id: uuidv4(),
                templateId: "",
                templateName: "",
                price: "",
                count: "",
                sum: '',
                square: 0,
                status: false,
                item: {}
            }
        ],
        clientId: "",
        clientCheck: false,
        summa: 0,

    }

    render() {



        const {inputs, clientId, summa, clientCheck} = this.state
        const {course, templateIncomeList, dispatch, userOne, templateList} = this.props
        console.log("templateList")
        console.log(templateList)


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
            let square = document.getElementById("square/" + id).value
            let templateId = document.getElementById("templateId/" + id).value
            let templateName = document.getElementById("templateName/" + id).innerText

            let arr = [...inputs]
            let index = this.state.inputs.findIndex(index => (index.id === id))
            let tr = arr[index]

            tr.templateId = templateId
            tr.templateName = templateName
            tr.price = price
            tr.count = count
            tr.sum = sum
            tr.square = square
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

        const calc = (e, item, name) => {
            if (name === "count") {
                let price = document.getElementById("price/" + item.id).value
                if (price === "" || price === null) {
                } else {
                    document.getElementById("sum/" + item.id).value = price * (e.target.value)
                    document.getElementById("square/" + item.id).value = `${item.item.item.size * (e.target.value)}`
                }
            } else if (name === "price") {
                let count = document.getElementById("count/" + item.id).value
                if (count === "" || count === null) {
                } else {
                    document.getElementById("sum/" + item.id).value = count * (e.target.value)
                }
            }

        }
        const getPrice = (e, id) => {
            if (e.value === 0) {
                console.log(e.value)
            } else {
                let index = this.state.inputs.findIndex(index => (index.id === id))
                let arr = [...inputs]
                let tr = arr[index]
                templateIncomeList.map(item => setTr(tr, item, e))
                this.setState({inputs: arr})
                document.getElementById(`templateId/${id}`).value = e.value
            }
        }

        const setTr = (tr, item, e) => {
            if (item.value === e.value) {
                tr.lastPrice = item.lastPrice
                tr.item = item
            }
            return tr;
        }

        const saveForm = (e, v) => {
            if (inputs.length !== 0) {
                let index = inputs.findIndex(item => item.status === false)

                if (index !== -1) {
                    toast.error("Jadvaldagi malumotlar to'liq kiritilmagan")
                } else {
                    if (v.clientFirst !== "") {
                        v.productList = inputs;
                        dispatch(simpleAction(v, {cAPI: "income", type: v.id !== '' ? "edit" : "save"}, false))
                    } else {
                        toast.error("Jadvaldagi malumotlar to'liq kiritilmagan")
                    }

                }
            } else {
                toast.error("Jadvaldagi malumotlar to'liq kiritilmagan")
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
                <div>
                    <Button color={"outline-success ml-2 mt-2"} onClick={addProduct}><img src={plus} alt=""
                                                                                          className={"text-white"}/></Button>
                    <AvForm onValidSubmit={saveForm}>
                        <AvField type={"hidden"} name={"id"}/>
                        <div className={"custom-res-div"}>
                            <div className={"custom-res-div2"}>
                                <Table className={"bg-white"}>
                                    <thead>
                                    <tr>
                                        <th>Tr</th>
                                        <th>Mahsulot</th>
                                        <th>List narxi</th>
                                        <th>List soni</th>
                                        <th>Jami summa</th>
                                        <th>Jami kvadrat</th>
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
                                                <td><Input type={"number"} disabled value={item.lastPrice}/></td>
                                                <td><Input type={"number"} value={item.price} disabled/></td>
                                                <td><Input type={"number"} value={item.count} disabled/></td>
                                                <td><Input type={"number"} value={item.sum} disabled/></td>
                                                <td><Input type={"text"} value={item.square} disabled/></td>
                                                <td>
                                                    <EditButton fun={() => editProduct(item.id)}/>
                                                    <DeleteButton fun={() => removeProduct(i)}/>
                                                </td>
                                            </tr>
                                            :
                                            <tr key={item.id}>
                                                <th scope="row">{i + 1}</th>
                                                <td className={"product-input"}>
                                                    {console.log(item)}
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
                                                        onChange={(e) => getPrice(e, item.id)}
                                                        placeholder={"Mahsulot"}
                                                        isSearchable={true}
                                                        options={templateIncomeList}
                                                        classNamePrefix={"select"}
                                                    />
                                                    <input id={`templateId/${item.id}`} type={"hidden"}/>
                                                </td>
                                                <td><Input type={"number"} min={0} id={`price/${item.id}`}
                                                           defaultValue={item.price}
                                                           onChange={(e) => calc(e, item, "price")}/></td>
                                                <td><Input type={"number"} min={0} id={`count/${item.id}`}
                                                           defaultValue={item.count}
                                                           onChange={(e) => calc(e, item, "count")}/>
                                                </td>
                                                <td><Input type={"text"} id={`sum/${item.id}`} defaultValue={item.sum}
                                                           disabled/></td>
                                                <td><Input type={"text"} id={`square/${item.id}`}
                                                           defaultValue={`${item.square ?? 0}`}
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
                        <Row className={"mb-2 ml-0"}>
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
                        <Button type={"reset"} color={"secondary ml-3 mr-2"}>Bekor qilish</Button>
                        <Button type={"Submit"} color={"primary"}>Saqlash</Button>
                    </AvForm>
                </div>
            </Container>
        );
    }
}

IncomeForm.propTypes = {};

export default connect(
    ({
         app: {
             openModal, deleteModal, currentItem, currentObject, userOne,
             attachmentId, attachmentUrl, viewImageModal, course, templateIncomeList, clientListSelect, incomeList, templateList
         },
         auth: {}
     }) => ({
        openModal, deleteModal, currentItem, currentObject, userOne,
        attachmentId, attachmentUrl, viewImageModal, templateIncomeList, clientListSelect, incomeList, course, templateList
    })
)(IncomeForm);