import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AlertSvg} from "../Icons";
import {logout} from "../../redux/actions/AuthActions";
import {connect} from "react-redux";
import "./CustomNavbar.scss"
import {Button, Col, Modal, ModalFooter, Row} from "reactstrap";
import {getOneAction, simpleAction} from "../../redux/actionFuncs/mainActions";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {RefreshButton} from "../CustomComponents/CustomButtons";
import {getNumberLLL} from "../../utils/SecondaryFuncs/customDate";
import {imageRole, nameRole, orderSA, orderAccountant} from "../../utils/SecondaryFuncs/nameOfRole";
import logoUt from "./../../resources/favicon/logout.png"

class CustomNavbar extends Component {
    componentDidMount() {
        this.props.dispatch(getOneAction({api : 'course'}))
    }

    state = {
        modal : false
    }

    render() {
        const {operationCount, currentUser, role, dispatch ,course} = this.props


        const showHideModal = () => {
            this.setState({modal : !this.state.modal})
        }

        const saveItem = (e,v) => {
            dispatch(simpleAction(v,{cAPI :"course", type : 'save'},true,false))
        }

        return (
            <div className={"custom-navbar"}>
                <div className={'left-side'}>
                    <Link to={`/${role.toLowerCase()}/home`} className={"logotip"}>
                        <p>
                            Alixman
                        </p>
                    </Link>

                </div>
                <div className={"center-side"}>
                    {/*<Row>*/}
                    {/*    <Col xs={12}>*/}
                    {/*        <div>*/}
                    {/*            <Row>*/}
                    {/*                <span className={"text-right pl-md-5"}>*/}
                    {/*                    <p className={"pt-1 course"}>1$={course ? getNumberLLL(course.value) : ''}</p>*/}
                    {/*                </span>*/}
                    {/*                <span className={"pl-1"}>*/}
                    {/*                    {orderSA(currentUser) || orderAccountant(currentUser) === true ? <RefreshButton fun={showHideModal}/> : ""}*/}
                    {/*                </span>*/}
                    {/*                <Col className={"pr-0"}>*/}

                    {/*                </Col>*/}
                    {/*            </Row>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </div>
                <div className={"right-side"}>
                    <div className={"alert mr-3"}>
                        <Link to={`/${role.toLowerCase()}/new-operations`}>
                            <AlertSvg/>
                            {operationCount > 0 ?
                                <span
                                    className={"position-absolute"}>{operationCount > 9 ? "9+" : operationCount}</span>
                                : ""
                            }
                        </Link>
                    </div>
                    <div className={"profile-div"}>
                        <div className={"profile-icon"}>
                            <Link to={`/${role.toLowerCase()}/profile`}>
                                <div>
                                    <Row>
                                        <Col className={"p-0"}>
                                            <img src={imageRole(currentUser)} alt={""} className={"rounded-circle"}/>
                                        </Col>
                                        <Col className={"px-1"}>
                                            <p className={"mb-0 pt-1 profil-userName"}>{currentUser ? `${currentUser.firstName.substring(0,9)}` : "Noma'lum"}</p>
                                            <p className={"profil-userRole mb-0"}>{currentUser ? `${nameRole(currentUser).substring(0,9)}` : "Noma'lum"}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={"exit"}>
                        <img src={logoUt} alt="" onClick={() => {
                            this.props.dispatch(logout())
                        }}/>
                    </div>
                </div>


                <Modal isOpen={this.state.modal}>
                    <AvForm className={"col-12 p-5"} onValidSubmit={saveItem}>
                        <h4 className={"title"}>Bugungi valyuta narxi</h4>

                        <hr />
                        <Row>
                            <Col md={2} className={"pr-0 pt-2 text-center"}><h5>1$ =></h5></Col>
                            <Col md={10}><AvField name={"value"} placeHolder={"Valyuta narxini kiriting"}/></Col>
                        </Row>


                        <ModalFooter className={"modal-footer mt-3"}>
                            <Button outline color="secondary" type={"button"} onClick={showHideModal}>Bekor qilish</Button>
                            <Button color="success" type={'submit'}>Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
            </div>
        );
    }
}

CustomNavbar.propTypes = {};

export default connect(
    ({
         app: {loading, attachmentUrl, operationCount,course},
         auth: {currentUser}
     }) => ({
        loading, currentUser, attachmentUrl, operationCount,course
    })
)(CustomNavbar);